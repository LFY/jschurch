
;; mcmc state stuff
(define (print-mcmc-state-xrps state)
  (map print-single-xrp (addbox->values (mcmc-state->xrp-draws state))))

;;mcmc-state structures consist of a store (which captures xrp state, etc), a score (which includes constraint enforcement), and a return value from applying a nfqp.
;;constructor/accessor fns: mcmc-state->xrp-draws, mcmc-state->score, mcmc-state->query-value, church-make-initial-mcmc-state.
(define (make-mcmc-state store value address) (list store value address))
(define mcmc-state->store first)
(define mcmc-state->address third)
(define (mcmc-state->xrp-draws state) (store->xrp-draws (mcmc-state->store state)))
(define (mcmc-state->diff-factors state) (store->diff-factors (mcmc-state->store state)))

(define (mcmc-state->score state)
  (if (not (eq? #t (first (second state))))
    minus-infinity ;;enforce conditioner.
    (store->score (mcmc-state->store state))))

(define (not-bool? x)
  (and (not (eq? #t x))
       (not (eq? #f x))))

(define (enforce-conditioner state b)
  (if b (store->score (mcmc-state->store state)) minus-infinity))

(define (mcmc-state->score-generic state)
  (let* ([cond-box (second state)])
    (if (not-bool? (first cond-box))
      (enforce-conditioner state (first (erase cond-box)))
      (enforce-conditioner state (first cond-box)))))

(define (mcmc-state->score+provenance state+-with-val+)
  (prov-init (let* ([state-with-val+ (erase state+-with-val+)])
               (if (not (eq? #t (first (erase (second state-with-val+)))))
                 minus-infinity
                 (store->score (mcmc-state->store state-with-val+))))))
;;compute the gradient of the score of a trace-container wrt any tapified erp values.
(define (mcmc-state->gradient state)
  (first
    (second
      (xy-gradient-R (lambda (f xrp-draws) (filter-map (lambda (x) (if (tape? (xrp-draw-value x))
                                                                     (f (xrp-draw-value x)) ;;FIXME: check structure
                                                                     #f))
                                                       xrp-draws)) ;map-independent
                     (addbox->values (mcmc-state->xrp-draws state)) ;x-reverse
                     (mcmc-state->score state) ;y-reverse
                     tapify))))


;;this assumes that nfqp returns a thunk, which is the delayed query value. we force (apply) the thunk here, using the store from the current state.
;;FIXME: there should be some way better than copying whole store...
(define (mcmc-state->query-value state)
  (let* ((store (mcmc-state->store state))
         (store (make-store (copy-addbox (store->xrp-draws store))
                            (copy-addbox (store->xrp-stats store))
                            (store->score store)
                            (store->tick store)
                            (store->enumeration-flag store)
                            (copy-addbox (store->factors store))
                            (store->diff-factors store)
                            (store->structural-addrs store)
                            )))
    (church-apply (mcmc-state->address state) store (cdr (second state)) '())))

;; Detect at runtime if we're dealing with provenance tracking or not
(define (mcmc-state->query-value-generic state)
  (let* ((store (mcmc-state->store state))
         (store (make-store (copy-addbox (store->xrp-draws store))
                            (copy-addbox (store->xrp-stats store))
                            (store->score store)
                            (store->tick store)
                            (store->enumeration-flag store)
                            (copy-addbox (store->factors store))
                            (store->diff-factors store)
                            (store->structural-addrs store)
                            ))
         (value-thunk (cdr (second state))) ;; This could be an annotated value!
         )
    (if (list? value-thunk)
      (erase (church-apply (mcmc-state->address state) store (cdr (erase (second state))) '()))
      (church-apply (mcmc-state->address state) store (cdr (second state)) '()))))

(define (mcmc-state->query-value+provenance state+)
  (let* ([state (erase state+)]
         (store (mcmc-state->store state))
         (store (make-store (copy-addbox (store->xrp-draws store))
                            (copy-addbox (store->xrp-stats store))
                            (store->score store)
                            (store->tick store)
                            (store->enumeration-flag store)
                            (copy-addbox (store->factors store))
                            (store->diff-factors store)
                            (store->structural-addrs store)
                            )))
    (clear-prov (church-apply (mcmc-state->address state) store (cdr (erase (second state))) '()))))

;;this captures the current store/address and packages up an initial mcmc-state.
;;should copy here? not needed currently, since counterfactual-update coppies and is only thing aplied to states....

(define (church-make-initial-mcmc-state address store)
  (make-mcmc-state store 'init-val address))

(define (church-make-initial-mcmc-state+provenance address store)
  (prov-init (make-mcmc-state store (prov-init 'init-val) address)))
