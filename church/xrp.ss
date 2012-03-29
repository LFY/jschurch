;; xrp draw datatype
;;================================================================================

(define (make-xrp-draw address value xrp-name proposer-thunk ticks score support structural)
  (list address value xrp-name proposer-thunk ticks score support structural))

(define xrp-draw-address first)
(define xrp-draw-value second)
(define xrp-draw-name third)
(define xrp-draw-proposer fourth)
(define xrp-draw-ticks fifth) ;;ticks is a pair of timer tick when this xrp-draw is touched and previous touch if any.
(define xrp-draw-score sixth)
(define xrp-draw-support seventh)
(define xrp-draw-structural? eighth)

(define (print-single-xrp xrp)
  (display (list (xrp-draw-address xrp) (xrp-draw-value xrp))))

;; We'd like to update the structural? field of each xrp draw according to structural-addrs in interv-store. This can probably be a separate function.
(define (xrp-draw-set-structural draw new-str)
  (make-xrp-draw
    (xrp-draw-address draw)
    (xrp-draw-value draw)
    (xrp-draw-name draw)
    (xrp-draw-proposer draw)
    (xrp-draw-ticks draw)
    (xrp-draw-score draw)
    (xrp-draw-support draw)
    new-str))

(define (update-xrp-draw-structural-fields store)
  (let ([draws (store->xrp-draws store)])
    (for-each (lambda (addr)
                (if (eq? trienone (read-addbox draws addr)) '() 
                  (update-addbox draws addr 
                                 (lambda (draw) 
                                   (begin 
                                     (xrp-draw-set-structural draw #t))))))
              (store->structural-addrs store))))

(define (store->structural-draws store)
  (filter xrp-draw-structural? (addbox->values (store->xrp-draws store))))

(define (store->nonstructural-draws store)
  (filter (lambda (d) (not (xrp-draw-structural? d)))
          (addbox->values (store->xrp-draws stre))))



(define (print-structural-addresses store)
  (begin
    (display 'structural-addresses:)
    (for-each display
              (store->structural-addrs store))))



;;note: this assumes that the fns (sample, incr-stats, decr-stats, etc) are church procedures.
;;FIXME: what should happen with the store when the sampler is a church random fn? should not accumulate stats/score since these are 'marginalized'.

(define (church-make-xrp address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support . maybe-structural)
  (let ([structural (if (not (null? maybe-structural))
                      (first maybe-structural)
                      false)])
    (let* ,(if *no-forcing*
             '()
             ;;when we might be lazy must force the input pieces:
             '((xrp-name (church-force address store xrp-name))
               (sample (church-force address store sample))
               (incr-stats (church-force address store incr-stats))
               (decr-stats (church-force address store decr-stats))
               (score (church-force address store score))
               (init-stats (church-force address store init-stats))
               (hyperparams (church-force address store hyperparams))
               (proposer (church-force address store proposer))
               (support (church-force address store support))) )

      ;;reset stats if this is first touch on this tick.
      (update-addbox (store->xrp-stats store)
                     address
                     (lambda (stats)
                       (if (or (eq? trienone stats) (not (= (store->tick store) (second stats))))
                         (list init-stats (store->tick store))
                         stats)))

      (let* ((xrp-address address)
             (proposer (if (null? proposer)
                         (lambda (address store operands old-value) ;;--> proposed-value forward-log-prob backward-log-prob
                           (let* ((dec (decr-stats address store old-value (car (read-addbox (store->xrp-stats store) xrp-address)) hyperparams operands))
                                  (decstats (second dec))
                                  (decscore (third dec))
                                  (sandbox-store (cons (make-addbox) (cdr store)));;FIXME: this is a hack to need to isolate random choices in sampler from MH.
                                  (inc (sample address sandbox-store decstats hyperparams operands))
                                  (proposal-value (first inc))
                                  (incscore (third inc)))
                             (list proposal-value incscore decscore)))
                         proposer))) ;;FIXME!! need to isolate provided proposer from MH...

        ;;the xrp itself: we update the xrp-draw at call address and return the new value.
        (lambda (address store . args)
          (define new-val '())

          (update-addbox (store->xrp-draws store)
                         address
                         (lambda (xrp-draw)
                           ;;FIXME!! check if this is same xrp (ie. if xrp-address has changed)?
                           ;;if this xrp-draw exists and has been touched on this tick, as in mem, don't change score or stats.
                           (if (and (not (eq? trienone xrp-draw)) (equal? (store->tick store) (car (xrp-draw-ticks xrp-draw))))
                             (begin (set! new-val (xrp-draw-value xrp-draw))
                                    xrp-draw)
                             (let* ((stats (car (read-addbox (store->xrp-stats store) xrp-address))) ;;FIXME: should only need to find the stats once, then do mutable update...
                                    (support-vals (if (null? support) '() (support address store stats hyperparams args))) 
                                    (sandbox-store (cons (make-addbox) (cdr store)));;FIXME: this is a hack to need to isolate random choices in sampler from MH.
                                    (tmp (if (eq? trienone xrp-draw)
                                           (sample address sandbox-store stats hyperparams args) 
                                           (incr-stats address sandbox-store (xrp-draw-value xrp-draw) stats hyperparams args)))
                                    ;(value ,(if *AD* '(if (continuous? (first tmp)) (tapify (first tmp)) (first tmp)) '(first tmp)))
                                    (value (first tmp))
                                    (new-stats (list (second tmp) (store->tick store)))
                                    (incr-score (third tmp)) ;;FIXME: need to catch measure zero xrp situation?
                                    (last-tick (if (eq? trienone xrp-draw)
                                                 #f
                                                 (car (xrp-draw-ticks xrp-draw))))
                                    (new-xrp-draw (make-xrp-draw address
                                                                 value
                                                                 xrp-name
                                                                 (lambda (address store state) ;;FIXME: clean up this proposer stuff...
                                                                   (let ((store (cons (first (mcmc-state->store state)) (cdr (mcmc-state->store state)))))
                                                                     (church-apply (mcmc-state->address state) store proposer (list args value))))
                                                                 (cons (store->tick store) last-tick)
                                                                 (if NO-FWD-PROB 0.0 incr-score)
                                                                 support-vals
                                                                 structural)))
                               (set! new-val value)
                               (insert-addbox (store->xrp-stats store) xrp-address new-stats)
                               (set-store-score! store (+ (store->score store) 
                                                          (if NO-FWD-PROB 0.0 incr-score)))
                               new-xrp-draw))))
          new-val)))))

(define (church-make-structural-xrp address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support)
  (church-make-xrp address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support true))

(define (church-make-xrp+provenance address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support)
  (church-make-xrp+provenance+structural-opt
    address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support false))

(define (church-make-structural-xrp+provenance address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support)
  (church-make-xrp+provenance+structural-opt
    address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support true))

(define (church-make-xrp+provenance+structural-opt
          address
          store
          xrp-name+
          sample+
          incr-stats+
          decr-stats+
          score+
          init-stats+
          hyperparams+
          proposer+
          support+
          structural)
  (let* ,(if *no-forcing*
           '(          
                       ;; [address (erase address+)]
                       ;; [store (erase store+)]
                       [xrp-name (erase xrp-name+)]
                       [sample (erase sample+)]
                       [incr-stats (erase incr-stats+)]
                       [decr-stats (erase decr-stats+)]
                       [score (erase score+)]
                       [init-stats (erase init-stats+)]
                       [hyperparams (erase hyperparams+)]
                       [proposer (erase proposer+)]
                       [support (erase support+)]
                       [hyperprovs (prov hyperparams+)]
                       )
           ;;when we might be lazy must force the input pieces:
           '((xrp-name (church-force address store xrp-name))
             (sample (church-force address store sample))
             (incr-stats (church-force address store incr-stats))
             (decr-stats (church-force address store decr-stats))
             (score (church-force address store score))
             (init-stats (church-force address store init-stats))
             (hyperparams (church-force address store hyperparams))
             (proposer (church-force address store proposer))
             (support (church-force address store support))) )

    ;;reset stats if this is first touch on this tick.
    (update-addbox (store->xrp-stats store)
                   address
                   (lambda (stats)
                     (if (or (eq? trienone stats) (not (= (store->tick store) (second stats))))
                       (list init-stats (store->tick store))
                       stats)))
    (display-debug "church-make-xrp-with-provenance:")

    (let* ((xrp-address address)
           (proposer
             (if (null? proposer)
               (prov-init
                 (lambda (address store operands+ old-value+) ;;--> proposed-value forward-log-prob backward-log-prob
                   (let* (
                          [dec (erase (decr-stats address store
                                                  old-value+
                                                  (prov-init (car (read-addbox (store->xrp-stats store) xrp-address)))
                                                  (prov-init hyperparams)
                                                  operands+
                                                  ))]
                          (decstats (second dec))
                          (decscore (third dec))
                          (sandbox-store (cons (make-addbox) (cdr store)));;FIXME: this is a hack to need to isolate random choices in sampler from MH.
                          (inc (erase (sample address sandbox-store (prov-init decstats) (prov-init hyperparams) operands+)))
                          (proposal-value (first inc))
                          (incscore (third inc)))
                     (prov-init (list proposal-value incscore decscore)))))
               proposer+))) ;;FIXME!! need to isolate provided proposer from MH...

      (display-debug "church-make-xrp-with-provenance-actual-xrp:")
      ;;the xrp itself: we update the xrp-draw at call address and return the new value.
      (prov-init (lambda (address store . val-provs)

                   (define provs (extract-provs val-provs))
                   (define args (extract-vals val-provs))
                   (define new-val '())
                   (update-addbox (store->xrp-draws store)
                                  address
                                  (lambda (xrp-draw)
                                    (begin 
                                      ;;FIXME!! check if this is same xrp (ie. if xrp-address has changed)?
                                      ;;if this xrp-draw exists and has been touched on this tick, as in mem, don't change score or stats.
                                      (if (and (not (eq? trienone xrp-draw)) (equal? (store->tick store) (car (xrp-draw-ticks xrp-draw))))
                                        (begin (set! new-val (xrp-draw-value xrp-draw))
                                               xrp-draw)
                                        (let* ((stats (car (read-addbox (store->xrp-stats store) xrp-address))) ;;FIXME: should only need to find the stats once, then do mutable update...
                                               (support-vals (if (null? support) '() (erase (apply-fn+prov address store support+ (list (prov-init stats) hyperparams+ (extract-opt-arg val-provs))))))
                                               (sandbox-store (cons (make-addbox) (cdr store)));;FIXME: this is a hack to need to isolate random choices in sampler from MH.
                                               (structural? structural)
                                               [tmp (if (eq? trienone xrp-draw)
                                                      (begin 
                                                        (display-debug '(in make-xrp+provenance calling sampler))
                                                        (display-debug (list (prov-init stats) hyperparams+ (extract-opt-arg val-provs)))
                                                        (erase (apply-fn+prov address sandbox-store sample+ (list (prov-init stats) hyperparams+ (extract-opt-arg val-provs)))))
                                                      ;;(sample address sandbox-store stats hyperparams args) 
                                                      (erase (apply-fn+prov address sandbox-store incr-stats+ (list (prov-init (xrp-draw-value xrp-draw)) (prov-init stats) hyperparams+ (extract-opt-arg val-provs)))))]
                                               [value (first tmp)]
                                               (new-stats (list (second tmp) (store->tick store)))
                                               (incr-score (third tmp)) ;;FIXME: need to catch measure zero xrp situation?
                                               (last-tick (if (eq? trienone xrp-draw)
                                                            #f
                                                            (car (xrp-draw-ticks xrp-draw))))
                                               (new-xrp-draw (make-xrp-draw address
                                                                            value
                                                                            xrp-name
                                                                            ;;proposer
                                                                            (prov-init (lambda (address store state+) ;;FIXME: clean up this proposer stuff...
                                                                                         (let* ([state (erase state+)])
                                                                                           (let ((store (cons (first (mcmc-state->store state)) (cdr (mcmc-state->store state)))))
                                                                                             (apply-fn+prov (mcmc-state->address state) store proposer (list (prov-init args) (prov-init value)))
                                                                                             ))))
                                                                            (cons (store->tick store) last-tick)
                                                                            incr-score
                                                                            support-vals
                                                                            structural?)))
                                          (set! new-val value)
                                          (insert-addbox (store->xrp-stats store) xrp-address new-stats)
                                          (set-store-score! store (+ (store->score store) incr-score))
                                          new-xrp-draw)))))
                   (begin 
                     (list new-val (merge-provs (addr->prov address) hyperprovs (merge-list-provs provs)))))))))

