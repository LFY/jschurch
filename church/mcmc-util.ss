(define (interp-range min max n) 
    (if (eq? n 1)
        max
        (map (lambda (i) (+ min (* (/ i (- n 1.0)) (- max min)))) (iota n))
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

(define (rejection-initializer init-store normal-form-proc)
  (let loop ()
    (let* ([init-state (church-make-initial-mcmc-state '(TOP) init-store)]
           [res-cu (counterfactual-update init-state normal-form-proc)]
           (rejectioninit-proposal-state (first res-cu))
           )
      (if (= minus-infinity (mcmc-state->score-generic rejectioninit-proposal-state))
        (loop) ;;don't care about bw/fw for init.
        rejectioninit-proposal-state))))

(define verbose-init #f)

;; basic iterators

; ;; mixture kernel
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

