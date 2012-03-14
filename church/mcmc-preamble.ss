;; This file contains all of the mcmc code that doesn't mess with
;; states, i.e., all of the stuff at the level of kernels and above.

;; what must be provided elsewhere:
;; counterfactual-update
;; structure handling: mcmc-state->xrp-draws, mcmc-state->score, mcmc-state->query-value.

;; NOTE: since these are church procedures, the xrp-list will accumulate draws due to accept/reject decisions and proposals. will this cause bad slowdown?

;; kernels (mcmc transition distributions) and proposal distributions

(define (generate-mcmc-header) `(

(define (interp-range min max n) 
    (if (eq? n 1)
        max
        (map (lambda (i) (+ min (* (/ i (- n 1)) (- max min)))) (iota n))
))

(define (interp-range-pow min max n pow)
  (let ((res-list (interp-range min max n)))
    (map (lambda (x) (- 1.0 (expt (- 1.0 x) pow))) res-list)))

(define provenance? list?)

(define (run-xrp-draw-proposer xrp state)
  (let* ([proc-or-box (xrp-draw-proposer xrp)])
    (if (provenance? proc-or-box)
      (erase (fn+prov '(PROPOSAL-ADDR) (mcmc-state->store state) proc-or-box (prov-init state)))
      (proc-or-box '(PROPOSAL-ADDR) (mcmc-state->store state) state))))
         
(define (default-scorer state)
  (mcmc-state->score-generic state))

(define (log-flip* . w)
  (if (null? w)
    (< (random-real) 0.5)
    (< (log (random-real)) (car w))))

(define (uniform-draw* lst)
  (if (null? lst)
    '() 
    (list-ref lst (random-integer (length lst)))))

(define (proposable-xrps state proposable?)
  (filter proposable? (addbox->values (mcmc-state->xrp-draws state))))

(define (selective-proposal-distribution state normal-form-proc proposable?)
  (if (addbox-empty? (mcmc-state->xrp-draws state))
    (list 0.0 state) ;; if no xrps have been drawn (eg all randomness in q-e) make trivial proposal. (still have to update..??)
    (let ((proposal-xrps (proposable-xrps state proposable?))) ;;fileter out proposable xrps to proposal-xrps
      (if (null? proposal-xrps)
        (list 0.0 state)
        (let* ((chosen-xrp (uniform-draw* proposal-xrps))
               (ret1 (run-xrp-draw-proposer chosen-xrp state))
               ;; [v (display (list 'from-run-xrp-draw-proposer: ret1))]
               (proposed-val (first ret1))
               (proposal-fw-score (second ret1))
               (proposal-bw-score (third ret1))
               (ret2 (counterfactual-update state normal-form-proc (pair chosen-xrp proposed-val)))
               (proposal-state (first ret2))
               (cd-bw/fw (second ret2))
               (ind-fw (- (log (length proposal-xrps))))
               (ind-bw (- (log (length (proposable-xrps proposal-state proposable?)))))
               ;; (dummy (display (list 'ind-fw ind-fw 'ind-bw ind-bw 'cd-bw/fw cd-bw/fw  'proposal-bw-score  proposal-bw-score 'proposal-fw-score  proposal-fw-score)))
               )
          (list (+ (- proposal-bw-score proposal-fw-score) cd-bw/fw (- ind-bw ind-fw)) proposal-state))))))

(define (basic-proposal-distribution state normal-form-proc)
  (selective-proposal-distribution state normal-form-proc (lambda (xrp-draw) true)))

(define (rejection-initializer normal-form-proc)
  (let loop ()
    (let* ([init-state (church-make-initial-mcmc-state '(TOP) (make-empty-store))]
           [res-cu (counterfactual-update init-state normal-form-proc)]
           (rejectioninit-proposal-state (first res-cu))
           )
      (if (= minus-infinity (mcmc-state->score-generic rejectioninit-proposal-state))
        (loop) ;;don't care about bw/fw for init.
        rejectioninit-proposal-state))))

(define verbose-init #f)
;; 
;; ;; initialize using rejection on highest temp
;; ;; then for each temp from high to low:
;; ;; - rescore
;; ;; - do rejuvenation steps
;; ;; finally, check whether p != 0 (if 0, restart at top)
;; =============================================================================
;; Note: This is not parseable by scheme2js at the moment.======================
;; =============================================================================
;; (define (annealing-initializer rej-steps temps:low->high temps->nfqp . rejuv-kernel-builder)
;;   (let* ([rejuv-kernel-builder (if (null? rejuv-kernel-builder) (lambda (nfqp) (basic-repeat-kernel rej-steps nfqp)) (first rejuv-kernel-builder))]
;;          [temps:high->low (reverse temps:low->high)]
;;          [normal-form-proc (apply temps->nfqp (first temps:high->low))]
;;          [initial-state (begin 
;;                           ;;(reset-store-xrp-draws)
;;                           (rejection-initializer normal-form-proc))])
;;     (let next-temp ([temps (rest temps:high->low)]
;;                     [mcmc-state initial-state])
;;       (if (= minus-infinity (mcmc-state->score mcmc-state))
;;         (begin
;;           (when verbose-init
;;             (display "annealing-initializer: failed, restarting at top ...\n"))
;;           (annealing-initializer rej-steps temps:low->high temps->nfqp rejuv-kernel-builder))
;;         (if (null? temps)
;;           (begin
;;             (when verbose-init
;;               (display "annealing-initializer: succeeded!\n"))
;;             mcmc-state)
;;           (begin
;;             (when verbose-init
;;               (for-each display
;;                         (list "annealing-initializer:\n"
;;                               "  temps remaining: " (length temps)
;;                               "\n  current temp: " (first temps)
;;                               ;"\n  current val: " (untapify (mcmc-state->query-value mcmc-state))
;;                               "\n")))
;;             (let* ([nfqp (apply temps->nfqp (first temps))]
;;                    [rescored-state (first (counterfactual-update mcmc-state nfqp))]
;;                    [kernel (rejuv-kernel-builder nfqp)]
;;                    [rej-state (kernel rescored-state)])
;;               (next-temp (rest temps)
;;                          rej-state))))))))
;; 

;; ;;basic MH kernel
;; ;;the proposal distribution takes a current state and returns a list of bw-fw score and proposed state.
;; ;;the scorer takes a state and returns the score.
;; 
(define (make-mh-kernel proposal-distribution scorer)
  (lambda (state)
    (let* (
           (ret (proposal-distribution state))
           (bw/fw (first ret))
           (proposal-state (second ret)) 
           (old-p (scorer state))
           (new-p (scorer proposal-state))
           (accept (log-flip* (min 0.0 (+ (- new-p old-p) bw/fw))))
           ;; [v (display (list 'scores bw/fw old-p new-p accept))]
           (score-ratio (+ (- new-p old-p) bw/fw))
           ;;(void (display (list 'score-ratio score-ratio)))
           ) ;;FIXME!! this is to avoid accumulating xrp-draws...

      (if accept
        proposal-state
        state))))

;;Larj Kernel
(define (larj-scorer state)
  (apply + (map factor-value (addbox->values (store->factors (mcmc-state->store state))))))

(define (make-larj-kernel proposal-distribution scorer)
  (lambda (state)
    (let* ((ret (proposal-distribution state))
           (bw/fw (first ret))
           (proposal-state (second ret)) 
           (number-of-proposals-made (third ret)) 
           (old-p (scorer state))
           (new-p (scorer proposal-state))
           (accept (log-flip* (min 0.0 (+ (- new-p old-p) bw/fw))))
           ;; (dummy (reset-store-xrp-draws))
           (score-ratio (- new-p old-p))
           ;;(dummy (display (list 'score-ratio score-ratio)))
           ) ;;FIXME!! this is to avoid accumulating xrp-draws...
      (if accept
        (list proposal-state number-of-proposals-made)
        (list state number-of-proposals-made)))))

;; ;; mixture kernel
;; (define (mixture-kernel cdf . kernels )
;;   (lambda (state)
;;     (let ((u (uniform)))
;;       (let loop ((kernels kernels)
;;                  (cdf cdf) )
;;         (if (<= u (car cdf))
;;             ((car kernels) state)
;;             (loop (cdr kernels)
;;                   (cdr cdf) ))))))

;; cycle kernel
(define (cycle-kernel . kernels)
  (lambda (state)
    (fold (lambda (k s) (k s)) state kernels)))

;; repeat a kernel
(define (repeat-kernel steps kernel)
  (apply cycle-kernel (make-list steps kernel)))

(define (basic-repeat-kernel steps nfqp)
  (repeat-kernel steps (make-mh-kernel (lambda (state) (basic-proposal-distribution state nfqp))
                                       default-scorer)))

;;;standard queries
(define (repeated-mcmc-query-core initializer kernel num-samples)
  (let ([init-state (initializer)])
    (mcmc-loop kernel init-state num-samples '())))

(define (repeated-mcmc-query-core-proposal-count initializer kernel num-proposals-to-make)
  (let ([init-state (initializer)])
    (let loop ((kernel kernel)
               (state init-state)
               (samples '())
               (num-proposals-left num-proposals-to-make)
               )
      (if (< num-proposals-left 1)
        (reverse samples)
        (let* (
               (state-and-num-proposals (kernel state))
               (next-state (first state-and-num-proposals))
               (next-num-proposal (second state-and-num-proposals)))
          (loop kernel next-state (pair (mcmc-state->query-value-generic state) samples) (- num-proposals-left next-num-proposal))))))) 

(define (mcmc-loop kernel state samples-left samples)
  (if (< samples-left 1)
    (reverse samples)
    (let* ([q-v (mcmc-state->query-value-generic state)])
      (mcmc-loop kernel (kernel state) (- samples-left 1) (pair q-v samples)))))

;; Queries: Church-MH ==========================================================

(define (mh-query* samples lag normal-form-proc)
  (repeated-mcmc-query-core (lambda () (rejection-initializer normal-form-proc))
                            (basic-repeat-kernel lag normal-form-proc)
                            samples))

(define (mh-query/annealed-init* temps samples lag rej-steps temps->nfqp)
  (let ([normal-form-proc (apply temps->nfqp (first temps))])
    (repeated-mcmc-query-core (lambda () (annealing-initializer rej-steps temps temps->nfqp))
                              (basic-repeat-kernel lag normal-form-proc)
                              samples)))

;; --------------------------------------------------------------------
;; LARJ

(define (should-do-larj? proposal-state)
  (let ((fpmc (mcmc-state->diff-factors proposal-state)))
    ;;(display (map length fpmc))
    (or (> (length (first fpmc)) 0) (> (length (second fpmc)) 0))
    ))

;; This is implementing Larj-mcmc outer proposals.
;; Larj-mcmc has two types of outer proposals: structural and non-structural.
(define (larj-selective-proposal-distribution state normal-form-proc proposable? num-temps power static-proposal)
  (if (addbox-empty? (mcmc-state->xrp-draws state))
    (list 0.0 state) ;; if no xrps have been drawn (eg all randomness in q-e) make trivial proposal. (still have to update..??)
    (let ((proposal-xrps (proposable-xrps state proposable?))) ;;fileter out proposable xrps to proposal-xrps
      (if (null? proposal-xrps)
        (list 0.0 state)
        (let* ((chosen-xrp (uniform-draw* proposal-xrps))
               (ret1 (run-xrp-draw-proposer chosen-xrp state))
               (proposed-val (first ret1))
               (proposal-fw-score (second ret1))
               (proposal-bw-score (third ret1))
               (ret2 (counterfactual-update-larj state normal-form-proc (pair chosen-xrp proposed-val))) 
               (proposal-state (first ret2))
               (cd-bw/fw (second ret2))
               (ind-fw (- (log (length proposal-xrps))))
               (ind-bw (- (log (length (proposable-xrps proposal-state proposable?)))))
               ;;(structural-change? (should-do-larj? proposal-state))
               (structural-change? (xrp-draw-structural? chosen-xrp))
               ;; [v (begin
               ;;      (display '(debug-larj-selective))
               ;;      (display (list (xrp-draw-address chosen-xrp) 'structural? (xrp-draw-structural? chosen-xrp))))]
               ;;(should-do-larj? proposal-state))
               (larj-state-and-correction (if structural-change?
                                            (do-larj-anneal-correction state proposal-state normal-form-proc num-temps power static-proposal)
                                            (list proposal-state 0.0)))
               (proposed-larj-state (first larj-state-and-correction))
               (larj-correction (second larj-state-and-correction))
               ;;(void (if structural-change? (display (list 'larj-correction larj-correction)) 'null))
               (num-proposals-to-make (if structural-change? (+ num-temps 1) 1))
               (final-correction (+ (+ (- proposal-bw-score proposal-fw-score) cd-bw/fw (- ind-bw ind-fw)) larj-correction))
               ;;(void (if structural-change? (display (list 'final-correction final-correction)) 'null))
               )
          ;; if structural-change? 1. run static kernel 2. get factor-diffs to compute correction terms
          (list (+ (+ (- proposal-bw-score proposal-fw-score) cd-bw/fw (- ind-bw ind-fw)) larj-correction)
                proposed-larj-state
                num-proposals-to-make
                ))))))


(define (extended-state-space-selective-proposal-distribution state1state2 normal-form-proc proposable?)
  (let* (
         (proposal-xrps (combine-proposable-xrp-draws state1state2 proposable?))
         )
    (if (null? proposal-xrps)
      (list 0.0 state1state2)
      (let* ((state1 (extended-state->before state1state2))
             (state2 (extended-state->after state1state2))
             (chosen-xrp (uniform-draw* proposal-xrps))

             (id-state-and-proposed-val (which-state-to-perturb-and-new-proposal chosen-xrp state1state2))
             (id-state-to-perturb (first id-state-and-proposed-val))
             (proposed-val (first (second id-state-and-proposed-val)))
             ;; (void (display 'id-state-to-perturb))
             ;; (void2 (display id-state-to-perturb))
             ;; (void3 (display 'chosen-xrp))
             ;; (void3 (print-single-xrp chosen-xrp))
             ;; (void3 (display 'state1-xrps))
             ;; (void3 (print-mcmc-state-xrps state1))
             ;; (void3 (display 'state2-xrps))
             ;; (void3 (print-mcmc-state-xrps state2))
             ;; 
             (state1* (if (or (= STATE_SRC_BOTH id-state-to-perturb) (= STATE_SRC_1 id-state-to-perturb)) 
                        (first (counterfactual-update state1 normal-form-proc (pair chosen-xrp proposed-val)))
                        state1
                        ))

             (state2* (if (or (= STATE_SRC_BOTH id-state-to-perturb) (= STATE_SRC_2 id-state-to-perturb)) 
                        (first (counterfactual-update state2 normal-form-proc (pair chosen-xrp proposed-val)))
                        state2))
             )
        (list 0 (make-extended-state state1* state2*))))))

(define (combine-proposable-xrp-draws state1state2 proposable?)
  (let* ((state1 (extended-state->before state1state2))
         (state2 (extended-state->after state1state2))
         ;; [v (display 'before-combine)]
         (combined-xrp-draws (combine-xrp-draws state1 state2))
         ;; [v (display 'after-combine)]
         ;; [v (display (length combined-xrp-draws))];; 'after-combine)]
         ;; [void (begin
         ;; (display '(all xrp-draws:))
         ;; (for-each (lambda (d) (begin (display (list (xrp-draw-address d) (xrp-draw-structural? d))))) combined-xrp-draws))]
         (proposable-xrp-draws (filter proposable? combined-xrp-draws)))
    ;; (display 'dimension-of-state1)
    ;; (display (length (filter proposable? (addbox->values (mcmc-state->xrp-draws state1)))))
    ;; (display 'dimension-of-state2)
    ;; (display (length (filter proposable? (addbox->values (mcmc-state->xrp-draws state2)))))
    ;; (display 'dimension-of-the-extended-state-space)
    ;; (display (length proposable-xrp-draws))
    proposable-xrp-draws))

(define STATE_SRC_NONE 0)
(define STATE_SRC_1 1)
(define STATE_SRC_2 2)
(define STATE_SRC_BOTH 3)


(define (which-state-to-perturb-and-new-proposal chosen-xrp state1state2)
  (let* ((state1 (extended-state->before state1state2))
         (state2 (extended-state->after state1state2)))
    (cond 
      [(and (xrp-in-state? chosen-xrp state1) (xrp-in-state? chosen-xrp state2)) ;; the chosen-xrp belongs to both state1 and state2
       (list STATE_SRC_BOTH (run-xrp-draw-proposer chosen-xrp state2))]
      [(xrp-in-state? chosen-xrp state2) ;; the chosen-xrp only belongs to state2
       (list STATE_SRC_2 (run-xrp-draw-proposer chosen-xrp state2))] 
      [(xrp-in-state? chosen-xrp state1) ;; the chosen-xrp only belongs to state1
       (list STATE_SRC_1 (run-xrp-draw-proposer chosen-xrp state1))] 
      [else
        (error chosen-xrp "Error: chosen xrp not in any of the two states!")])))

(define (get-larj-score state1state2 temp up-down-temp)
  (let* ((state1 (extended-state->before state1state2))
         (state2 (extended-state->after state1state2))
         (after-update-from-state1-fpmc (update-f-plus-minus-common-scores state1 (store->diff-factors (mcmc-state->store state2))))
         (new-fpmc (update-f-plus-minus-common-scores state2 after-update-from-state1-fpmc))
         (f-plus (first new-fpmc))
         (f-minus (second new-fpmc))
         (f-common (third new-fpmc))

         ;; (num-f-plus-no-anneal (length (map factor-value (filter factor-must-not-anneal? f-plus))))
         ;; (num-f-plus-anneal (length (map factor-value (filter (lambda (f)
         ;;                                                     (or (factor-auto-anneal? f)
         ;;                                                         (factor-must-anneal? f))) f-plus))))
         ;; (num-f-minus-no-anneal (length (map factor-value (filter factor-must-not-anneal? f-minus))))
         ;; (num-f-minus-anneal (length (map factor-value (filter (lambda (f)
         ;;                                                     (or (factor-auto-anneal? f)
         ;;                                                         (factor-must-anneal? f))) f-minus))))

         ;; (num-f-common-anneal (length (map factor-value (filter factor-must-anneal? f-common))))
         ;; (num-f-common-no-anneal (length (map factor-value (filter (lambda (f)
         ;;                               (or (factor-auto-anneal? f)
         ;;                                   (factor-must-not-anneal? f))) f-common))))

         (f-plus-no-anneal (apply + (map factor-value (filter factor-must-not-anneal? f-plus))))
         (f-plus-anneal (apply + (map factor-value (filter (lambda (f) (not (factor-must-not-anneal? f))) f-plus))))
         (f-minus-no-anneal (apply + (map factor-value (filter factor-must-not-anneal? f-minus))))
         (f-minus-anneal (apply + (map factor-value (filter (lambda (f) (not (factor-must-not-anneal? f))) f-minus))))
         (f-common-must-anneal (apply + (map factor-value (filter factor-must-anneal? f-common))))
         (f-common-no-anneal (apply + (map factor-value (filter (lambda (f) (not (factor-must-anneal? f))) f-common))))

         (f-plus-score (+ f-plus-no-anneal (* f-plus-anneal (- 1.0 temp))))
         (f-minus-score (+ f-minus-no-anneal (* f-minus-anneal temp)))
         (f-common-score (+ (* f-common-must-anneal up-down-temp) f-common-no-anneal)))
    ;; (if #t
    ;;   (begin
    ;;     (display 'f-plus-minus-common)
    ;;     (display (list (length f-plus) (length f-minus) (length f-common)))
    ;;     (display 'which-anneal)
    ;;     (display (list 
    ;;                (list num-f-plus-anneal num-f-plus-no-anneal)
    ;;                (list num-f-minus-anneal num-f-minus-no-anneal)
    ;;                (list num-f-common-anneal num-f-common-no-anneal )))
    ;;     (display 'score-after-annealing)
    ;;     (display (list f-plus-score f-minus-score f-common-score)))
    ;;   '()
    ;;   )

    ;; (display `(
    ;; (f+: ,num-f-plus-anneal ,num-f-plus-no-anneal)
    ;; (f-: ,num-f-minus-anneal ,num-f-minus-no-anneal)
    ;; (fc: ,num-f-common-anneal ,num-f-common-no-anneal)))
    ;;(display (list 'score-before-annealing 'temp temp))
    ;;(display (list f-plus-score-before-annealing f-minus-score-before-annealing f-common-score-before-annealing))

    (+ f-plus-score f-minus-score f-common-score)))

(define (do-larj-anneal-correction original-state jumped-state normal-form-proc num-temps power static-proposal)
  (let loop ((total-correction 0)
             (temp-list 
               (begin 
                 ;;(display (interp-range-pow 1.0 0.0 num-temps 1))
                 (interp-range-pow 1.0 0.0 num-temps power) 
                 ))
             (up-down-temp-list
               (if (even? num-temps)
                 (append
                   (interp-range-pow 1.0 0.0 (/ num-temps 2) power)
                   (interp-range-pow 0.0 1.0 (/ num-temps 2) power))
                 (append
                   (interp-range-pow 1.0 0.0 (+ 1 (/ num-temps 2)) power)
                   (cdr (interp-range-pow 0.0 1.0 (+ 1 (/ num-temps 2)) power)))))
             (curr-state (make-extended-state original-state jumped-state)))
    (if (= temp-list '())
      (list (extended-state->after curr-state) total-correction)
      (let* ((bw/fw-and-next-state (static-proposal curr-state))
             (bw/fw (first bw/fw-and-next-state))
             (next-state (second bw/fw-and-next-state))
             (curr-score (get-larj-score curr-state (car temp-list) (car up-down-temp-list)))
             (next-score (get-larj-score next-state (car temp-list) (car up-down-temp-list)))
             (local-alpha (- next-score curr-score))
             (accept (log-flip* (min 0.0 (+ local-alpha bw/fw))))
             ;;(void (display (list 'local-alpha local-alpha 'accept accept)))
             )
        ;; (display 'one-anneal-step)
        (if accept
          (loop (+ total-correction (- local-alpha)) (cdr temp-list) (cdr up-down-temp-list) next-state) ;;if accept, accumulate alpha
          (loop total-correction (cdr temp-list) (cdr up-down-temp-list) curr-state))))))

(define (non-structural-proposal-distribution state normal-form-proc)
  (selective-proposal-distribution state
                                   normal-form-proc
                                   (lambda (xrp-draw) (not (xrp-draw-structural? xrp-draw)))))

(define (extended-state-space-proposal-distribution state1state2 normal-form-proc)
  (extended-state-space-selective-proposal-distribution state1state2
                                                        normal-form-proc
                                                        (lambda (xrp-draw) (not (xrp-draw-structural? xrp-draw)))))

(define (larj-proposal-distribution state normal-form-proc num-temps power static-proposal)
  (larj-selective-proposal-distribution state
                                        normal-form-proc
                                        xrp-draw-structural? num-temps power static-proposal))

(define (non-structural-kernel steps nfqp)
  (repeat-kernel steps 
                 (make-mh-kernel 
                   (lambda (state) (non-structural-proposal-distribution state nfqp))
                   default-scorer)))

;; larj kernel
;; The static-proposal is used for performing proposals in the annealing stage. 
;; The extended-state-space, state1state2, is a list of two states corresponding to the state space before and after the jump.
;; We use the extended-state-space representation it lets us to make proposals to variables to be removed more easily. 
;; In addition, we need to calculate the scores of f-plus, f-minus, and f-common.
(define (larj-kernel num-temps steps power nfqp)
  (let ((static-proposal (lambda (state1state2) (extended-state-space-proposal-distribution state1state2 nfqp))))
    (repeat-kernel 
      steps 
      (make-mh-kernel
        (lambda (state) (larj-proposal-distribution state nfqp num-temps power static-proposal))
        default-scorer))))

(define (larj-kernel-proposal-count num-temps steps power nfqp)
  (let ((static-proposal (lambda (state1state2) (extended-state-space-proposal-distribution state1state2 nfqp))))
    (make-larj-kernel
      (lambda (state) (larj-proposal-distribution state nfqp num-temps power static-proposal))
      default-scorer)))


;; Queries: LA-Church ==========================================================

(define (non-structural-mh-query* samples lag normal-form-proc)
  (repeated-mcmc-query-core (lambda () (rejection-initializer normal-form-proc))
                            (non-structural-kernel lag normal-form-proc)
                            samples))

(define (larj-mh-query+power* samples lag num-temps power normal-form-proc)
  (repeated-mcmc-query-core (lambda () (rejection-initializer normal-form-proc))  ;; initializer
                            (larj-kernel num-temps lag power normal-form-proc)     ;; kernel
                            samples))                                        ;; num samples to show

(define (larj-mh-query* samples lag num-temps normal-form-proc)
  (repeated-mcmc-query-core (lambda () (rejection-initializer normal-form-proc))  ;; initializer
                            (larj-kernel num-temps lag 1 normal-form-proc)     ;; kernel
                            samples))

(define (larj-mh-query-proposal-count+power* num-proposals-to-make lag num-temps power normal-form-proc)
  (repeated-mcmc-query-core-proposal-count (lambda () (rejection-initializer normal-form-proc))  ;; initializer
                                           (larj-kernel-proposal-count num-temps lag power normal-form-proc)     ;; kernel
                                           num-proposals-to-make))                                        ;; num samples to show

(define (larj-mh-query-proposal-count* num-proposals-to-make lag num-temps normal-form-proc)
  (repeated-mcmc-query-core-proposal-count (lambda () (rejection-initializer normal-form-proc))  ;; initializer
                                           (larj-kernel-proposal-count num-temps lag 1 normal-form-proc)     ;; kernel
                                           num-proposals-to-make))
))
