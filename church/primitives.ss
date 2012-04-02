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

(define (fsts xs) (map car xs))
(define (snds xs) (map cadr xs))

(define (my-last xs)
  (cond [(null? (cdr xs)) (car xs)]
        [else (my-last (cdr xs))]))

(define (my-take xs n)
  (define (loop acc n xs)
    (cond [(= n 0) (reverse acc)]
          [else
            (loop (cons (car xs) acc) (- n 1) (cdr xs))]))
  (loop '() n xs))

(define (set-list-elt! lst elt n)
  (let loop ([curr lst]
             [i 0])
    (if (= i n)
      (set-car! curr elt)
      (loop (cdr curr) (+ i 1)))))


;; Formatting


(define (flatten-list xss)
  (define (loop acc xss)
    (cond [(null? xss) acc]
          [(list? (car xss))
           (loop (append acc (loop '() (car xss)))
                 (cdr xss))]
          [else
            (loop (append acc (list (car xss)))
                  (cdr xss))]))
  (loop '() xss))

(define empty-str (list->string '()))

(define space (list->string (list #\space)))

(define (delimit c xs)
  (if (null? xs) 
    empty-str
    (string-append (car xs) c (delimit c (cdr xs)))))

(define (convert-string x)
  (cond [(number? x) (string-append "n" (number->string x))]
        [(symbol? x) (symbol->string x)]
        [(string? x) (string-append "v" x)]
        [(null? x) "null"]
        [else x]))

(define (address->string addr)
  (let* ([flattened-address (flatten-list addr)]
         [strings (map convert-string flattened-address)])
    (delimit space strings)))

