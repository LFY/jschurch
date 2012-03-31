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

