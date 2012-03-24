;; ;;basic MH kernel
;; ;;the proposal distribution takes a current state and returns a list of bw-fw score and proposed state.
;; ;;the scorer takes a state and returns the score.
;; 
(define (make-mh-kernel proposal-distribution scorer)
  (lambda (state)
    (let* (
           [v (display-larj (list 'curr-sample (mcmc-state->query-value-generic state)))]
           (ret (proposal-distribution state))
           (bw/fw (first ret))
           (proposal-state (second ret)) 
           (old-p (scorer state))
           (new-p (scorer proposal-state))
           (accept (log-flip* (min 0.0 (+ (- new-p old-p) bw/fw))))
           (score-ratio (+ (- new-p old-p) bw/fw))
           [v (display-larj (list 'scores: 'bw/fw bw/fw 'old-p old-p 'new-p new-p 'accept accept 'score-ratio score-ratio))]
           ) ;;FIXME!! this is to avoid accumulating xrp-draws...

      (if accept
        (begin (display-larj-stats 'larj-run-accept)
        proposal-state)
        (begin (display-larj-stats 'larj-run-reject)
               state)))))

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

(define (basic-repeat-kernel steps nfqp)
  (repeat-kernel steps (make-mh-kernel (lambda (state) (basic-proposal-distribution state nfqp))
                                       default-scorer)))
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

