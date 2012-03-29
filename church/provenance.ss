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

(define empty-prov '())
(define addr->prov list)
(define merge-provs append)
(define (merge-list-provs xs) (delete-duplicates (apply append xs)))
(define (prov->list xs) xs)


(define (extract-vals xs) (map (lambda (x) (if (null? x) '() (car x))) xs))

(define (extract-provs xs) (map (lambda (x) (if (null? x) '() (cadr x))) xs))

(define church-apply+prov
  (prov-init
    (lambda (address store proc args)
      ,(if *no-forcing*
         `(apply (erase proc) address store args)
         `(apply (church-force address store proc) address store (church-force address store args))
         ))))

(define (if+prov store condition true-branch false-branch)
  (let* ([res (erase condition)]
         [prov-of-condition (prov condition)])
    (begin
      (store-add-structural-dep! store
                                 prov-of-condition)
      (if res
        (prov+ (true-branch) prov-of-condition)
        (prov+ (false-branch) prov-of-condition)))))

(define (extract-opt-arg pr-pvs)
  (make-prov (extract-vals pr-pvs) 
             (merge-list-provs (extract-provs pr-pvs))))

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
   (make-prov
    (apply proc (extract-vals args))
    (merge-list-provs (extract-provs args))))

(define (apply-prim+prov+addressing address store proc args)
  (make-prov
    (apply proc address store (extract-vals args))
    (merge-list-provs (extract-provs args))))

(define (split-share-prov args-prov)
  (let* ([prov (prov args-prov)])
    (map (lambda (arg) (list arg prov)) (erase args-prov))))

(define (lifted-apply address store proc+ . args+s)
  (let* ([split-args+s (if (= (length args+s) 1) 
                         (split-share-prov (car args+s))
                         (append (my-take args+s (- (length args+s) 1))
                                 (split-share-prov (my-last args+s))))])
    (apply (erase proc+) address store split-args+s)))

(define (apply-fn+prov address store proc val-provs)
  (church-apply address store (erase proc) val-provs))

(define (inc-prov+provenance v+)
  (make-prov v+ empty-prov))

(define (dec-prov+provenance v++)
  (erase v++))
