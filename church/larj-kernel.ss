

(define (make-larj-kernel proposal-distribution scorer)
  (lambda (state)
    (let* ([v (display-larj (list 'curr-sample (mcmc-state->query-value-generic state)))]
           (ret (proposal-distribution state))
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
        (begin (display-larj-stats 'larj-run-accept)
               (display-larj-log (list 'final-score-ratio (+ (- new-p old-p) bw/fw)))
               (display-larj-log (mcmc-state->query-value-generic proposal-state))
               (list proposal-state number-of-proposals-made))
        (begin (display-larj-stats 'larj-run-reject)
               (display-larj-log (list 'final-score-ratio (+ (- new-p old-p) bw/fw)))
               (display-larj-log (mcmc-state->query-value-generic state))
               (list state number-of-proposals-made))))))



;; --------------------------------------------------------------------
;; LARJ

(define DEBUG-LARJ #f)
(define PRINT-LARJ-STATS #f)
(define (enable-larj-debug)
  (set! DEBUG-LARJ #t))
(define (disable-larj-debug)
  (set! DEBUG-LARJ #f))
(define (display-larj x) (if DEBUG-LARJ (display x) '()))

(define (enable-larj-stats) (set! PRINT-LARJ-STATS #t))
(define (disable-larj-stats) (set! PRINT-LARJ-STATS #f))
(define (display-larj-stats x) (if PRINT-LARJ-STATS (display x) '()))

(define PRINT-LARJ-RUN #f)
(define (enable-larj-log) (set! PRINT-LARJ-RUN #t))
(define (disable-larj-log) (set! PRINT-LARJ-RUN #f))
(define (display-larj-log x) (if PRINT-LARJ-RUN (display x) '()))

(define STOP-ALPHA #f)

(define (enable-anneal-early-stop a)
  (set! STOP-ALPHA a))
(define (disable-anneal-early-stop)
  (set! STOP-ALPHA #f))

(define (should-do-larj? proposal-state)
  (let ((fpmc (mcmc-state->diff-factors proposal-state)))
    ;;(display (map length fpmc))
    (or (> (length (first fpmc)) 0) (> (length (second fpmc)) 0))
    ))

(define (should-do-larj?-dynamic proposal-state)
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
               ;;(structural-change? (and (xrp-draw-structural? chosen-xrp) (should-do-larj? proposal-state)))
               (structural-change? (xrp-draw-structural? chosen-xrp))
               ;; [v (begin
               ;;      (display '(debug-larj-selective))
               ;;      (display (list (xrp-draw-address chosen-xrp) 'structural? (xrp-draw-structural? chosen-xrp))))]
               ;;(should-do-larj? proposal-state))
               (larj-state-and-correction (if structural-change?
                                            (begin (display-larj 'do-structural-change)
                                                   (do-larj-anneal-correction state proposal-state normal-form-proc num-temps power static-proposal))
                                            (list proposal-state 0.0)))
               (proposed-larj-state (first larj-state-and-correction))
               (larj-correction (second larj-state-and-correction))
               (num-proposals-to-make (if structural-change? (third larj-state-and-correction) 1))
               (final-correction (+ (+ (- proposal-bw-score proposal-fw-score) cd-bw/fw (- ind-bw ind-fw)) larj-correction))
               [void (display-larj-log (list 'larj-correction larj-correction))]
               [void (display-larj (list 
                                     'total-corrections:
                                     'larj-correction larj-correction
                                     'prop-fw proposal-fw-score
                                     'prop-bw proposal-bw-score
                                     'cd-bw/fw cd-bw/fw
                                     'ind-bw ind-bw
                                     'ind-fw ind-fw
                                     'final-correction final-correction
                                     'did-anneal? structural-change?))]
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
                        (begin (display-larj 'perturb-state-before)
                               (first (counterfactual-update state1 normal-form-proc (pair chosen-xrp proposed-val))))
                        state1
                        ))

             (state2* (if (or (= STATE_SRC_BOTH id-state-to-perturb) (= STATE_SRC_2 id-state-to-perturb)) 
                        (begin (display-larj 'perturb-state-after)
                               (first (counterfactual-update state2 normal-form-proc (pair chosen-xrp proposed-val))))
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
         (f-common-score (+ (* f-common-must-anneal up-down-temp) f-common-no-anneal))
         [void
           (begin
             (display-larj (list 'f+anneal f-plus-anneal (* f-plus-anneal (- 1.0 temp))))
             (display-larj (list 'f-anneal f-minus-anneal (* f-minus-anneal temp)))
             (display-larj (list 'fc-no-anneal f-common-no-anneal ))
             (display-larj (list 'fc-anneal f-common-must-anneal (* f-common-must-anneal up-down-temp)))
             (display-larj (list 'f+no-anneal f-plus-no-anneal))
             (display-larj (list 'f-no-anneal f-minus-no-anneal)))])
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

;; z^n, z < 1
(define (geo-seq n z)
  (append (map (lambda (i) (expt z i)) (iota (- n 1)))
          (list 0.0)))

;; (define (geo-seq n)
;;   (if (= n 1) (list 1.0)
;;     (cons (/ 1.0 n) (geo-seq (- n 1)))))
;; 
;; (define (forward-geo-temps n)
;;   (map (lambda (x) (- 1.0 x)) (geo-seq n)))

(define (replicate n x)
  (if (= n 0) '()
    (cons x (replicate (- n 1) x))))

(define (list-rep n xs)
  (apply append (map (lambda (x) (replicate n x)) xs)))


(define (do-larj-anneal-correction original-state jumped-state normal-form-proc num-temps power static-proposal)
  (let loop ((total-correction 0)
             (temp-list 
               (begin 
                 ;;(display (interp-range-pow 1.0 0.0 num-temps 1))
                 ;;(geo-seq num-temps power)))
                 (interp-range-pow 1.0 0.0 num-temps power)))
             ;;(list-rep 20 (forward-geo-temps num-temps))))

             ;; (up-down-temp-list
             ;;  (if (even? num-temps)
             ;;    (append
             ;;      (geo-seq (/ num-temps 2) power)
             ;;      (reverse (geo-seq (/ num-temps 2) power)))
             ;;    (append
             ;;      (geo-seq (+ 1 (floor (/ num-temps 2))))
             ;;      (cdr (reverse (geo-seq (+ 1 (floor (/ num-temps 2)))))))))
             ;; (up-down-temp-list
             ;;   (list-rep 20 (if (even? num-temps)
             ;;     (append
             ;;       (forward-geo-temps (/ num-temps 2))
             ;;       (reverse (forward-geo-temps (/ num-temps 2))))
             ;;     (append
             ;;       (forward-geo-temps (+ 1 (/ num-temps 2)))
             ;;       (cdr (reverse (forward-geo-temps (+ 1 (/ num-temps 2)))))))))
             (up-down-temp-list
               (if (even? num-temps)
                 (append
                   (interp-range-pow 1.0 0.0 (floor (/ num-temps 2)) power)
                   (interp-range-pow 0.0 1.0 (floor (/ num-temps 2)) power))
                 (append
                   (interp-range-pow 1.0 0.0 (+ 1 (floor (/ num-temps 2))) power)
                   (cdr (interp-range-pow 0.0 1.0 (+ 1 (floor (/ num-temps 2))) power)))))
             (curr-state (make-extended-state original-state jumped-state)))
    (cond [(= temp-list '()) 
           (list (extended-state->after curr-state) total-correction (- num-temps (length temp-list)))]
          [(and STOP-ALPHA (> STOP-ALPHA total-correction))
           (begin
             (display-larj-stats 'EARLY-REJECTION)
             (list (extended-state->after curr-state) total-correction (- num-temps (length temp-list))))]
          [else
            (let* ([void (display-larj 'one-anneal-step)]
                   (bw/fw-and-next-state (static-proposal curr-state))
                   (bw/fw (first bw/fw-and-next-state))
                   (next-state (second bw/fw-and-next-state))
                   (curr-score (get-larj-score curr-state (car temp-list) (car up-down-temp-list)))
                   [void (display-larj (list 'current-annealed-score curr-score))]
                   (next-score (get-larj-score next-state (car temp-list) (car up-down-temp-list)))
                   [void (display-larj (list 'next-annealed-score next-score))]
                   (local-alpha (- next-score curr-score))
                   (accept (log-flip* (min 0.0 (+ local-alpha bw/fw))))
                   (void (display-larj (list 'curr-before (mcmc-state->query-value-generic (extended-state->before curr-state)))))
                   (void (display-larj (list 'curr-after (mcmc-state->query-value-generic (extended-state->after curr-state)))))
                   (void (display-larj (list 'next-before (mcmc-state->query-value-generic (extended-state->before next-state)))))
                   (void (display-larj (list 'next-after (mcmc-state->query-value-generic (extended-state->after next-state)))))
                   (void (display-larj (list 'temp (car temp-list) 'local-alpha local-alpha 'accept accept 'total-correction-to-accumulate total-correction)))
                   )
              ;;(display 'one-anneal-step)
              (if accept
                (loop (+ total-correction (- local-alpha)) (cdr temp-list) (cdr up-down-temp-list) next-state) ;;if accept, accumulate alpha
                (loop total-correction (cdr temp-list) (cdr up-down-temp-list) curr-state)))])))

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
;;(lambda (x) true) num-temps power static-proposal))

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

(define (larj-kernel-proposal-count+select-proposable proposable? num-temps steps power nfqp)
  (let ((static-proposal (lambda (state1state2) (extended-state-space-proposal-distribution state1state2 nfqp))))
    (make-larj-kernel
      (lambda (state) (larj-selective-proposal-distribution state nfqp proposable? num-temps power static-proposal))
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

(define (larj-mh-query-generic*
          proposable? num-proposals-to-make power
          num-temps normal-form-proc)
  (repeated-mcmc-query-core-proposal-count (lambda () (rejection-initializer normal-form-proc))  ;; initializer
                                           (larj-kernel-proposal-count+select-proposable 
                                             (cond [(equal? 'all proposable?) (lambda (x) true)]
                                                   [(equal? 'struct proposable?)
                                                    xrp-draw-structural?]
                                                   [else xrp-draw-structural?])
                                             num-temps 1 power normal-form-proc)     ;; kernel
                                           num-proposals-to-make))