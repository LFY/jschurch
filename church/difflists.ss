;; difference list primitives
;; constructors

(define (list->dlist xs)
  (lambda (rest) (append xs rest)))

(define (dlist->list dxs) (dxs '()))

(define dl-null (lambda (xs) xs))

(define (dl-unit x) (lambda (rest) (cons x rest)))

(define (dl-cons x dl)
  (let* ([f1 (lambda (xs) (cons x xs))])
    (compose f1 dl)))

(define (dl-snoc dl x)
  (let* ([f1 (lambda (xs) (cons x xs))])
    (compose dl f1)))

(define dl-append compose)
