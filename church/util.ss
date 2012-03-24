(define church-true #t)
(define church-false #f)

(define church-infinity infinity)
(define church-minus-infinity minus-infinity)
(define church-nan nan)
(define church-pi pi)

(define (church-or address store . args) (fold (lambda (x y) (or x y)) #f args))
(define (church-and address store . args) 
  (fold (lambda (x y) (and x y)) #t args))

;;;
;;misc church primitives
(define (church-apply address store proc args)
  ,(if *no-forcing*
     `(apply proc address store args)
     `(apply (church-force address store proc) address store (church-force address store args))
     ))

;; more church primitives
;;provided for laziness and constraint prop:
(define (church-force address store val) 
  (if (and (pair? val) (eq? (car val) 'delayed)) 
    (church-force address store ((cadr val) address store))
    val))

;; functional primitives

(define (const x y) x)

(define (compose . fs)
  (let loop ([acc (lambda (x) x)]
             [rest fs])
    (if (null? rest) acc
      (loop (lambda (x) 
              (acc ((car rest) x))) (cdr rest)))))

;; functional primitives
(define (fsts xs) (map car xs))
(define (snds xs) (map cadr xs))
