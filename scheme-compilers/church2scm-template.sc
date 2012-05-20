(import (shred-random))

(define infinity +inf.0)
(define minus-infinity -inf.0)
(define nan +nan.0)
(define pi 3.131592653589793238)

(load "srfi-1.scm")

;;;The following math functions (which are provided by GSL in the ikarus version) could be given js implementations...
(define (discrete-pdf probs val) (list-ref probs val))
(define (discrete-sampler probs)
  (let loop ((probs probs)
             (past 0)
             (i 0))
    (if (< (random-real) (/ (first probs) (- 1 past)))
        i
        (loop (rest probs) (+ past (first probs)) (+ i 1)))))

;;;various functions needed by header:

;; ;(fold kons knil lis) = (fold kons (kons (car lis) knil) (cdr lis))
;; ;(fold kons knil '()) = knil
(define (fold f z xs)
  (if (null? xs)
      z
      (fold f (f (first xs) z) (rest xs))))

(define current-date (lambda args #f))
(define exact->inexact (lambda (x) x))
(define inexact->exact (lambda (x) x))

(define scheme-gensym gensym)

(define true #t)
(define false #f)

(define first car)
(define rest cdr)
(define pair cons)
(define (second lst) (cadr lst))
(define (third lst) (caddr lst))
(define (fourth lst) (cadddr lst))
(define (fifth lst) (list-ref lst 4))
(define (sixth lst) (list-ref lst 5))
(define (seventh lst) (list-ref lst 6))
(define (eighth lst) (list-ref lst 7))
(define (ninth lst) (list-ref lst 8))
(define (tenth lst) (list-ref lst 9))

;;;for score gradients (currently not working), requires AD:
(define (*with-score-gradient*) #f)
(define (xy-gradient-R x) (error 'grad-undefined "xy-gradient-R undefined"))
(define (tape? x) #f)
(define (tapify x) x)
(define (untapify x) x)
;; (define (min a b) (if (< a b) a b)) ;;FIXME: proper dmin?
;; (define (continuous? x) (and (real? x) (not (fixnum? x))))
(define continuous? real?)


;;;the program, defining the church-main function, will be spliced in here:
{churchprogram}

;;go...
(time (church-main '(top) (make-empty-store)))
