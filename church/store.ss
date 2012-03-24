;;stuff for xrps (and dealing with stores):
(define (make-store xrp-draws xrp-stats score tick enumeration-flag factors diff-factors structural-addrs) 
  (list xrp-draws xrp-stats score tick enumeration-flag factors diff-factors structural-addrs))
(define (make-empty-store) (make-store (make-addbox) (make-addbox) 0.0 0 #f (make-addbox) '(() () ()) '()))

(define store->xrp-draws first)
(define set-store-xrp-draws! set-car!)

(define (set-list-elt! lst elt n)
  (let loop ([curr lst]
             [i 0])
    (if (= i n)
      (set-car! curr elt)
      (loop (cdr curr) (+ i 1)))))

(define (set-store-factors! store new-factors)
  (set-list-elt! store new-factors 5))
(define (set-store-diff-factors! store new-diff-factors)
  (set-list-elt! store new-diff-factors 6))
(define (set-store-structural-addrs! store structural)
  (set-list-elt! store structural 7))
(define store->factors sixth)
(define store->diff-factors seventh)
(define (store->structural-addrs store) (list-ref store 7))
(define (store-add-structural-dep! store new-deps)
  (begin 
    (if DEBUG (begin
                (display-debug "store-add-structural-dep:")
                (display-debug (length store))
                (display-debug new-deps)
                (display-debug (store->structural-addrs store))
                (display-debug (store->structural-addrs store))
                ) '())
    ;;(append! (filter (lambda (x) (not (null? x))) (prov->list new-deps)) (store->structural-addrs store))))
    (set-store-structural-addrs! store (delete-duplicates (append (filter (lambda (x) (not (null? x))) (prov->list new-deps)) 
                                                                  (store->structural-addrs store) )))))

(define store->xrp-stats second)
(define store->score third)
(define (set-store-score! store score) (cons (car store) (cons (cadr store) (set-car! (cddr store) score))))
(define store->tick fourth)
(define store->enumeration-flag fifth) ;;FIXME: this is a hacky way to deal with enumeration...

(define (church-reset-store-xrp-draws address store)
  (begin
    (if DEBUG (begin
                (display-debug '(in church reset store xrp draws))
                (display-debug (list address store))) '())
    (set-store-xrp-draws! store (make-addbox))))

(define church-reset-store-xrp-draws+provenance church-reset-store-xrp-draws)
(define (church-reset-store-factors address store)
  (set-store-factors! store (make-addbox)))
(define church-reset-store-factors+provenance church-reset-store-factors)
(define (church-reset-store-structural-addrs address store)
  (set-store-structural-addrs! store '()))
(define church-reset-store-structural-addrs+provenance church-reset-store-structural-addrs)
