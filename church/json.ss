(define (make-json-list . args) (cons 'list args))

(define (make-json-kvs . kvs)
  (if (odd? (length kvs))
    (error "should provide kv pairs.")
    (let loop
      ((kvpairs kvs)
       (res '()))
      (if (null? kvpairs)
        res
        (loop (cddr kvpairs) (cons (list (car kvpairs) (cadr kvpairs)) res))))))

(define (combine-dicts d1 d2)
  (cons dict (append (cdr d1) (cdr d2))))

(define (scm-dict? xs)
  (and (list? xs) (not (null? xs)) (equal? 'dict (car xs))))

(define (scm->json-val v)
  (cond [(symbol? v) (symbol->string v)]
        [(number? v) v]
        [(string? v) v]))

(define (scm->json-list xs)
  (cond [(null? xs) js-nil]
        [else (js-cons (scm->json (car xs)) (scm->json-list (cdr xs)))]))

(define (kvs->alist kvs)
  (cond [(null? kvs) '()]
        [else (let ([k (car kvs)]
                    [v (cadr kvs)])
                (cons (cons k v) (kvs->alist (cddr kvs))))]))


(define (scm2jsmap f xs)
  (if (null? xs) js-nil
    (js-cons (f (car xs)) (scm2jsmap f (cdr xs)))))

(define (scm->json-dict xs)
  (let* ([kvs (kvs->alist (cdr xs))]
         [kvs* (scm2jsmap (lambda (kv) (cons (scm->json (car kv)) (scm->json (cdr kv)))) kvs)])
    (js-alist->js-dict kvs*)))

(define (scm->json e)
  (cond
    [(scm-dict? e) (scm->json-dict e)]
    [(list? e) (scm->json-list e)]
    [else (scm->json-val e)]))
