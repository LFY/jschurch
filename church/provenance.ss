;; provenance primitives
;; argument lists

(define arglist list)

;; empty annotation

;; initialize an annotated value
(define (make-prov v p)
  (list v p))

;; prov-init/erase are lift/extract

(define (prov-init sexpr)
  (list sexpr empty-prov))
(define (clear-prov v+)
  (list (car v+) empty-prov))

(define erase first)

;; get the dependencies of a value

(define prov second)
;; add a set of dependencies to a value's dependencies
(define (prov+ e p)
  (list (erase e) (merge-provs p (prov e))))

(define (add-prov p ps) (cons p ps))

(define provs->list (lambda (x) x))

(define church-apply+prov
  (prov-init
    (lambda (address store proc args)
      ,(if *no-forcing*
         `(apply (erase proc) address store args)
         `(apply (church-force address store proc) address store (church-force address store args))
         ))))

(define DEBUG #f)
(define DEBUG-DEP #f)
(define (enable-prov-debug)
  (set! DEBUG-DEP #t))
(define (disable-prov-debug)
  (set! DEBUG-DEP #f))

(define NO-FWD-PROB #f)
(define (disable-fwd-prob) (set! NO-FWD-PROB #t))
(define (enable-fwd-prob) (set! NO-FWD-PROB #f))

(define (display-debug x)
  (if DEBUG (display x) '()))

(define (if+prov store condition true-branch false-branch)
  (let* ([res (erase condition)]
         [prov-of-condition (prov condition)])
    (begin
      ;; (display "if:")
      ;; (display label)
      ;; (display-debug condition)
      ;; (display-debug "endif:") 
      ;; (display store)
      (store-add-structural-dep! store
                                 prov-of-condition)
      (if res
        (prov+ (true-branch) prov-of-condition)
        (prov+ (false-branch) prov-of-condition)))))


(define (extract-vals xs) (map (lambda (x) (if (null? x) '() (car x))) xs))

(define (extract-provs xs) (map (lambda (x) (if (null? x) '() (cadr x))) xs))

(define empty-prov '())
(define addr->prov list)
(define merge-provs append)
(define (merge-list-provs xs) (delete-duplicates (apply append xs)))
(define (prov->list xs) xs)

(define (extract-opt-arg pr-pvs)
  (begin
    (display-debug "extract-opt-arg:")
    (display-debug pr-pvs)        
    (make-prov (extract-vals pr-pvs) 
               (merge-list-provs (extract-provs pr-pvs)))))

(define (display-prov+provenance x+)
  (display (list 'val (erase x+) 'prov (prov->list (prov x+)))))

(define (church-display-structural-addrs address store)
  (print-structural-addresses store))

(define (prim+prov f . args)
  (apply-prim+prov f args))

(define (prim+prov+addr address store f . args)
  (apply-prim+prov+addressing address store f args))

(define (fn+prov address store f . args)
  (apply-fn+prov address store f args))

(define (bind-prov f . args+)
  (apply f (map erase args+)))

(define (bind-prov+addr address store f . args+)
  (church-apply address store f (map erase args+)))


(define (apply-prim+prov proc args)
  ;; (begin 
  ;;   (display-debug "apply-prim:")
  ;;   (display-debug proc)
  ;;   (display-debug args)
  ;;   (display-debug (length args))
  ;;   (display-debug "end-apply-prim:")
  (make-prov
    (apply proc (extract-vals args))
    (merge-list-provs (extract-provs args)))
  ;;   )
  )

(define (apply-prim+prov+addressing address store proc args)
  (make-prov
    (apply proc address store (extract-vals args))
    (merge-list-provs (extract-provs args))))

(define (my-last xs)
  (cond [(null? (cdr xs)) (car xs)]
        [else (my-last (cdr xs))]))

(define (my-take xs n)
  (define (loop acc n xs)
    (cond [(= n 0) (reverse acc)]
          [else
            (loop (cons (car xs) acc) (- n 1) (cdr xs))]))
  (loop '() n xs))

(define (split-share-prov args-prov)
  (begin
    (display-debug "split-share-prov:")
    (display-debug args-prov)
    (let* ([prov (prov args-prov)])
      (map (lambda (arg) (list arg prov)) (erase args-prov)))))

(define (lifted-apply address store proc+ . args+s)
  (let* ([split-args+s (if (= (length args+s) 1) 
                         (split-share-prov (car args+s))
                         (append (my-take args+s (- (length args+s) 1))
                                 (split-share-prov (my-last args+s))))])
    (apply (erase proc+) address store split-args+s)))

(define (apply-fn+prov address store proc val-provs)
  (begin
    (if DEBUG (begin
                (display "apply-fn:")
                (display proc)
                (display val-provs)
                (display "end-apply-fn:")) '())
    (church-apply address store (erase proc) val-provs)))

    ;; provenance primitives

    (define (inc-prov+provenance v+)
      (make-prov v+ empty-prov))

    (define (dec-prov+provenance v++)
      (erase v++))
