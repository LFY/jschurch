;; helper functions for LARJ-MCMC===============================================

(define make-extended-state list)
(define extended-state->before first)
(define extended-state->after second)

(define (xrp-in-state? xrp state)
  (not (eq? 'none (read-addbox (store->xrp-draws (mcmc-state->store state))
                               (xrp-draw-address xrp)))))

(define (combine-xrp-draws state1 state2)
  (addbox->values (fold (lambda (xrp xrps)
                          (update-addbox xrps (xrp-draw-address xrp) (lambda (xrp-draw) xrp)))
                        (copy-addbox (store->xrp-draws (mcmc-state->store state1))) 
                        (addbox->values (store->xrp-draws (mcmc-state->store state2))))))

(define (lookup-factor-and-update factors-addbox target-factor)
  (let ((lookup-factor (read-addbox factors-addbox (factor-address target-factor))))
    (if (not (eq? 'none lookup-factor))
      lookup-factor
      target-factor)))

(define (update-f-plus-minus-common-scores state target-f-plus-minus-common)
  (let ([fresh-factors (store->factors (mcmc-state->store state))])
    (map (lambda (factor-instances)
           (map (lambda (factor-instance)
                  (lookup-factor-and-update fresh-factors factor-instance))
                factor-instances))
         target-f-plus-minus-common)))




