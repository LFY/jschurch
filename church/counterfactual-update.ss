
;; the counterfactual update that only affects static kernels
(define (counterfactual-update state nfqp . interventions)
  (let* ((interv-store (make-store (fold (lambda (interv xrps)
                                           (update-addbox xrps 
                                                          (xrp-draw-address (first interv))
                                                          (lambda (xrp-draw)
                                                            (make-xrp-draw (xrp-draw-address (first interv))
                                                                           (cdr interv)
                                                                           (xrp-draw-name (first interv))
                                                                           (xrp-draw-proposer (first interv))
                                                                           (xrp-draw-ticks (first interv))
                                                                           'dummy-score ;;dummy score which will be replace on update.
                                                                           (xrp-draw-support (first interv))
                                                                           (xrp-draw-structural? (first interv))
                                                                           ))))
                                         (copy-addbox (store->xrp-draws (mcmc-state->store state)))
                                         interventions)
                                   (copy-addbox (store->xrp-stats (mcmc-state->store state)))
                                   0.0
                                   (+ 1 (store->tick (mcmc-state->store state))) ;;increment the generation counter.
                                   (store->enumeration-flag (mcmc-state->store state))
                                   (copy-addbox (store->factors (mcmc-state->store state)))
                                   (store->diff-factors (mcmc-state->store state))
                                   (store->structural-addrs (mcmc-state->store state))
                                   ))

         ;;application of the nfqp happens with interv-store, which is a copy so won't mutate original state.
         ;;after application the store must be captured and put into the mcmc-state.
         (value (church-apply (mcmc-state->address state) interv-store nfqp '()))
         (new-diff-factors (f-plus-minus-common interv-store))
         (void3 (update-xrp-draw-structural-fields interv-store))
         (void4 (if DEBUG-DEP (begin
                                (display 'counterfactual-update-start+static:)
                                (print-structural-addresses interv-store)
                                (print-diff-factor-addrs new-diff-factors))))
         (cd-bw/fw (if (store->enumeration-flag interv-store)
                     0
                     (clean-store interv-store))) ;;FIXME!! need to clean out unused xrp-stats?
         )
    ;;(display '================)
    ;;(for-each 
    ;;  display (map first (addbox->values (store->xrp-draws interv-store))))

    (when (not (store->enumeration-flag interv-store))
      (clean-store-factors interv-store))
    (let ([proposal-state (make-mcmc-state interv-store value (mcmc-state->address state))] 
          )
      (list proposal-state cd-bw/fw))))

;; counterfactual update for LARJMCMC kernel which would allow structural changes.
(define (counterfactual-update-larj state nfqp . interventions)
  (let* ((interv-store (make-store (fold (lambda (interv xrps)
                                           (update-addbox xrps (xrp-draw-address (first interv))
                                                          (lambda (xrp-draw)
                                                            (make-xrp-draw (xrp-draw-address (first interv))
                                                                           (cdr interv)
                                                                           (xrp-draw-name (first interv))
                                                                           (xrp-draw-proposer (first interv))
                                                                           (xrp-draw-ticks (first interv))
                                                                           'dummy-score ;;dummy score which will be replace on update.
                                                                           (xrp-draw-support (first interv))
                                                                           (xrp-draw-structural? (first interv))
                                                                           ))))
                                         (copy-addbox (store->xrp-draws (mcmc-state->store state)))
                                         interventions)
                                   (copy-addbox (store->xrp-stats (mcmc-state->store state)))
                                   0.0
                                   (+ 1 (store->tick (mcmc-state->store state))) ;;increment the generation counter.
                                   (store->enumeration-flag (mcmc-state->store state))
                                   (copy-addbox (store->factors (mcmc-state->store state)))
                                   (store->diff-factors (mcmc-state->store state))
                                   ;;empty-prov ;; empty set of structural addrs
                                   '()))
         ;;application of the nfqp happens with interv-store, which is a copy so won't mutate original state.
         ;;after application the store must be captured and put into the mcmc-state.
         (value (church-apply (mcmc-state->address state) interv-store nfqp '()))
         ;;(void (display 'mcmc-state->query-value))
         ;;(void (display ((cdr value))))
         (cd-bw/fw (if (store->enumeration-flag interv-store)
                     0
                     (clean-store interv-store))) ;;FIXME!! need to clean out unused xrp-stats?
         (new-diff-factors (f-plus-minus-common interv-store))
         (void1 (when (not (store->enumeration-flag interv-store))
                  (clean-store-factors interv-store)))
         (void2 (set-store-diff-factors! interv-store new-diff-factors))
         (void3 (update-xrp-draw-structural-fields interv-store))
         (void4 (if DEBUG-DEP (begin
                                (display 'counterfactual-update-larj:)
                                (print-structural-addresses interv-store)
                                (print-diff-factor-addrs (store->diff-factors interv-store)))))
         (proposal-state (make-mcmc-state interv-store value (mcmc-state->address state)))
         )
    (list proposal-state cd-bw/fw)))

;;we need to pull out the subset of new-state xrp-draws that were touched on this pass,
;;at the same time we want to accumulate the bw score of these deleted xrp-draws and the fw score of any new ones.
;;FIXME: this doesn't play nice with addbox abstraction, and is linear time in the number of xrp-draws.
;;FIXME: this method won't work with caching since used xrp-draws may not get 'touched'...
;;FIXME: assumes new choices drawn from the conditional prior -- that's currently true but not general.
(define (clean-store store)
  (let loop ((draws (addbox->values (store->xrp-draws store)))
             (used-draws '())
             (bw/fw 0.0))
    (cond [(null? draws) 
           (begin 
             (set-store-xrp-draws! store (alist->addbox (map (lambda (d) (cons (xrp-draw-address d) d)) used-draws)))
             bw/fw)]
          [else (if (= (first (xrp-draw-ticks (car draws))) (store->tick store)) ;; this is a newly updated xrp-draw
                  (if (eq? #f (cdr (xrp-draw-ticks (car draws))))
                    ;;this was a new xrp-draw, accumulate fw prob:
                    (loop (cdr draws) (cons (car draws) used-draws) (- bw/fw
                                                                       (xrp-draw-score (car draws)) ;;NOTE: incremental differs here
                                                                       )) 
                    ;;this xrp-draw existed already:
                    (loop (cdr draws) (cons (car draws) used-draws) bw/fw))
                  ;;this xrp-draw was not used in last update, drop it and accumulate bw prob:
                  (loop (cdr draws) used-draws (+ bw/fw
                                                  (xrp-draw-score (car draws)) ;;NOTE: incremental differs here
                                                  )))])))

(define (factors->addbox factors)
  (alist->addbox (map (lambda (d) (cons (factor-address d) d)) factors)))

(define (clean-store-factors store)
  (let loop ((factors (addbox->values (store->factors store)))
             (fresh-factors '()))
    (if (null? factors)
      (set-store-factors! store (factors->addbox fresh-factors))
      (loop (cdr factors) 
            (if (factor-expired? (car factors) (store->tick store))
              fresh-factors
              (cons (car factors) fresh-factors))))))

(define (factor-new? factor)
  (eq? #f (cdr (factor-ticks factor))))

(define (factor-expired? factor tick)
  (not (= (first (factor-ticks factor))
          tick)))

;;delete old factor-instances
;;set store of f-plus, f-minus and f-common
(define (f-plus-minus-common store)
  (let ((result
          (let loop ((factors (addbox->values (store->factors store)))
                     (f-plus '())
                     (f-minus '())
                     (f-common '()))
            (if (null? factors)
              (list f-plus f-minus f-common)
              (if (factor-expired? (car factors) (store->tick store))
                (loop (cdr factors) f-plus (cons (car factors) f-minus) f-common)
                (if (factor-new? (car factors))
                  (loop (cdr factors) (cons (car factors) f-plus) f-minus f-common)
                  (if (factor-must-anneal-f+-? (car factors))
                    (loop (cdr factors) (cons (car factors) f-plus) (cons (car factors) f-minus) f-common)
                    (loop (cdr factors) f-plus f-minus (cons (car factors) f-common)))))))))

    (begin
      ;;(display 'f-plus)
      ;;(display (length (first result)))
      ;;(display (first result))
      ;;(display 'f-minus)
      ;;(display (length (second result)))
      ;;(display (second result))
      ;;(display 'f-common)
      ;;(display (length (third result)))
      ;;(display (third result))
      result
      )
    ))
