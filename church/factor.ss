;; factor instance datatype

(define MUST-ANNEAL 0)
(define AUTO-ANNEAL 1)
(define MUST-NOT-ANNEAL 2)
(define MUST-ANNEAL-F+- 2)

(define (make-factor-instance address args value factor-function ticks should-update? should-anneal? provenance)
  (list address args value factor-function ticks should-update? should-anneal? provenance))

(define factor-address first)
(define factor-args second)
(define factor-value third)
(define factor-scorer fourth)
(define factor-ticks fifth)
(define factor-should-update? sixth)
(define factor-should-anneal? seventh)
(define factor-provenance eighth)

(define (factor-must-anneal? f) (eq? MUST-ANNEAL (factor-should-anneal? f)))
(define (factor-must-anneal-f+-? f) (eq? MUST-ANNEAL-F+- (factor-should-anneal? f)))
(define (factor-must-not-anneal? f) (eq? MUST-NOT-ANNEAL (factor-should-anneal? f)))
(define (factor-auto-anneal? f) (eq? AUTO-ANNEAL (factor-should-anneal? f)))

(define (zip2 xs ys)
  (let loop ([acc '()]
             [xs xs]
             [ys ys])
    (cond [(or (null? xs) (null? ys)) (reverse acc)]
          [else
            (loop (cons (list (car xs) (car ys)) acc) (cdr xs) (cdr ys))])))

(define (print-diff-factor-addrs fpmc)
  (let* ([f+ (car fpmc)]
         [f- (cadr fpmc)]
         [fc (caddr fpmc)])
    (map (lambda (fs-l) 
           (begin
             (display (cadr fs-l))
             (for-each display (map factor-address (car fs-l)))))
         (zip2 (list f+ f- fc) '(f+ f- fc)))))

;; addr may be nested, and contain other arguments (if we are using mem)

;; For debugging / displaying the graph

(define (church-fg->json+provenance address store)
  (let* ([factors (addbox->values (store->factors store))]
         [factor-id->scopes 
           (list (list 'factors
                 (cons 'list
                       (map (lambda (f)
                              (list
                                (list 'factor
                                      (list 
                                        (list 'address (address->string (factor-address f)))
                                        (list 'scope (cons 'list 
                                                           (map address->string
                                                                (factor-provenance f))))))))
                            factors))))])
    (prov-init (json factor-id->scopes))))

(define (church-make-factor-generic address store factor-function should-anneal)
  (lambda (address store . args)
    (define new-val '())
    (update-addbox (store->factors store)
                   address
                   (lambda (factor-instance)
                     (let* ([sandbox-store (cons (make-addbox) (cdr store))] ;; replace xrp-draws with an empty addbox
                            [should-update? #t] ;; right now, scores of all factors are recaluated;;(if (eq? trienone factor-instance) #t (not (equal? (factor-args factor-instance) args)))]
                            ;; [void (begin (display "should-update:") (display should-update?))]
                            [val (church-apply address sandbox-store factor-function args)]
                            ;; [val (cond
                            ;; [(eq? trienone factor-instance) (factor-function address sandbox-store args)]
                            ;; [(not (equal? (factor-args factor-instance) args)) (factor-function address sandbox-store args)]
                            ;; [else (factor-value factor-instance)])]
                            [last-tick (if (eq? trienone factor-instance) #f
                                         (car (factor-ticks factor-instance)))]
                            [new-factor-instance
                              (make-factor-instance
                                address args val factor-function
                                (cons (store->tick store) last-tick)
                                should-update?
                                should-anneal
                                '())])
                       (set! new-val val)
                       (set-store-score! store (+ (store->score store) val))
                       new-factor-instance)))
    new-val
    ))

(define (church-make-factor address store factor-function)
  (church-make-factor-generic address store factor-function AUTO-ANNEAL))

(define (church-make-factor-annealed address store factor-function)
  (church-make-factor-generic address store factor-function MUST-ANNEAL))

(define (church-make-factor-frozen address store factor-function)
  (church-make-factor-generic address store factor-function MUST-NOT-ANNEAL))

(define (church-make-factor-generic+provenance address store factor-function+ should-anneal)
  (let* ([factor-function (erase factor-function+)]
         [hyperprov (prov factor-function+)])
    (prov-init (lambda (address store . args+)
                 (define args (extract-vals args+))
                 (define provs (extract-provs args+))


                 (define new-val '())
                 (update-addbox (store->factors store)
                                address
                                (lambda (factor-instance)
                                  (let* (

                                         ;; Using provenance to determine whether it should be annealed
                                         [previous-prov (if (not (eq? trienone factor-instance)) (factor-provenance factor-instance) (prov->list empty-prov))];;[sandbox-store (cons (make-addbox) (cdr store))]
                                         [new-provenance (delete-duplicates (prov->list (merge-list-provs provs)))]
                                         [structure-change? (not (equal? previous-prov new-provenance))]
                                         [v (if DEBUG-DEP
                                              (begin
                                                (display (list 'factor-addr address))
                                                (display (list 'prov-before (prov->list previous-prov)))
                                                (display (list 'prov-after (prov->list new-provenance)))
                                                (display (list 'structure-change? structure-change?))))]
                                         [auto-should-anneal (if (eq? trienone factor-instance) ;; Definitely anneal, will suffice to AUTO-ANNEAL this
                                                               AUTO-ANNEAL
                                                               (if (eq? (factor-should-anneal? factor-instance) MUST-NOT-ANNEAL)
                                                                 MUST-NOT-ANNEAL
                                                                 (if structure-change? ;; if it is AUTO-ANNEAL or MUST-ANNEAL
                                                                   MUST-ANNEAL-F+-
                                                                   (factor-should-anneal? factor-instance))))]

                                         [sandbox-store (make-empty-store)]

                                         [should-update? #t];;(if (eq? trienone factor-instance) #t (not (equal? (factor-args factor-instance) args)))]
                                         [void (begin (display-debug "should-update:") (display-debug should-update?))]
                                         ;;(apply-fn+prov address sandbox-store sample+ (list (prov-init stats) hyperparams+ (extract-opt-arg val-provs)))
                                         ;;[val (church-apply address sandbox-store factor-function args)]
                                         [val+ (apply-fn+prov address sandbox-store 
                                                              factor-function+ args+)]
                                         [val (erase val+)]
                                         [prov (prov val+)]
                                         ;; [val (cond
                                         ;; [(eq? trienone factor-instance) (factor-function address sandbox-store args)]
                                         ;; [(not (equal? (factor-args factor-instance) args)) (factor-function address sandbox-store args)]
                                         ;; [else (factor-value factor-instance)])]
                                         [last-tick (if (eq? trienone factor-instance) #f
                                                      (car (factor-ticks factor-instance)))]
                                         [new-factor-instance
                                           (make-factor-instance
                                             address args val factor-function
                                             (cons (store->tick store) last-tick)
                                             should-update?
                                             auto-should-anneal
                                             new-provenance)])
                                    (set! new-val val)
                                    (set-store-score! store (+ (store->score store) val))
                                    new-factor-instance)))
                 (list new-val empty-prov)))))

(define (church-make-factor+provenance address store factor-function+)
  (church-make-factor-generic+provenance address store factor-function+ AUTO-ANNEAL))
(define (church-make-factor-annealed+provenance address store factor-function+)
  (church-make-factor-generic+provenance address store factor-function+ MUST-ANNEAL))
(define (church-make-factor-frozen+provenance address store factor-function+)
  (church-make-factor-generic+provenance address store factor-function+ MUST-NOT-ANNEAL))
