
;; authors: noah goodman

;;this library generates the church-specific header definitions.
;;the header includes:
;;  church-make-xrp
;;  church-apply, church-eval
;;  mcmc helper code.
;;  deterministic (non-higher-order) scheme primitives wrapped up into church- forms. 

;;this should generate scheme compatible with r4rs+srfi1.

;;NOTE: primitive symbols not otherwise defined are assumed to be provided by the target language. this includes, for example, a bunch of random sampling/scoring functions that xrp-preamble will want.


;;(library
;; (church header)

;; (export generate-header)

;; (import (rnrs)
;;         (scheme-tools srfi-compat :1) ; lists
;;         (church readable-scheme)
;;         )

(define *no-forcing* true)
(define *AD* false) ;;when AD is true, continuous XRP return values will be tapified.

;;the header is a list of definitions in the (target) scheme. it provides primitives, xrp handling, mh helpers, etc.
;;any free "church-" variable in the program that isn't provided explicitly (by generate-special or by external defs)
;;is assumed to be a scheme primitive, and a church- definition is generated for it.
;;(free symbols that occur in operator position are assumed primitive, and won't have church- prefix.)
(define (generate-header free-variables external-defs lazy)
  (set! *no-forcing* (not lazy)) 
  (let* ((special-defs (generate-special))
         (def-symbols (map (lambda (d) (if (pair? (second d)) (first (second d)) (second d)))
                           (append special-defs external-defs))) ;;get symbols defined by header and external fns.
         ;;any remaining church- free variables is assumed to have an underlying primitive, package them up:
         (primitive-defs (map primitive-def+provenance (lset-difference eq? (filter church-symbol? free-variables) def-symbols))))
    (append external-defs primitive-defs special-defs)))

(define (generate-header-generic primitive-lifter free-variables external-defs lazy)
  (set! *no-forcing* (not lazy)) 
  (let* ((special-defs (generate-special))
         (def-symbols (map (lambda (d) (if (pair? (second d)) (first (second d)) (second d)))
                           (append special-defs external-defs))) ;;get symbols defined by header and external fns.
         ;;any remaining church- free variables is assumed to have an underlying primitive, package them up:
         (primitive-defs (map primitive-lifter (lset-difference eq? (filter church-symbol? free-variables) def-symbols))))
    (append external-defs primitive-defs special-defs)))

(define (prefix-church symb) (string->symbol (string-append "church-" (symbol->string symb))))
(define (un-prefix-church symb) (if (church-symbol? symb)
                                    (string->symbol (list->string (drop (string->list (symbol->string symb)) 7)))
                                    symb))
(define (church-symbol? symb) (and (< 7 (length (string->list (symbol->string symb))))
                                   (equal? "church-" (list->string (take (string->list (symbol->string symb)) 7)))))
(define (primitive-def symb)
  (if *no-forcing*
      `(define ,symb (lambda (address store . args) (apply ,(un-prefix-church symb) args)))
      `(define ,symb (lambda (address store . args) (apply ,(un-prefix-church symb) (map (lambda (a) (church-force address store a)) args))))))

(define (primitive-def+provenance symb)
  (if *no-forcing*
    `(define ,symb (list (lambda (address store . args) 
                           (list
                             (apply ,(un-prefix-church symb) (extract-vals args))
                             (merge-list-provs (extract-provs args))
                             ))
                         ;;(lambda (xs) xs)))
                         '()))
    `(define ,symb (lambda (address store . args) (apply ,(un-prefix-church symb) (map (lambda (a) (church-force address store a)) args))))))


(define (generate-special)
  `(

    (load "church-primitives.ss")

    (load "provenance.ss")

    (load "trlists.ss")
    (load "difflists.ss")

    (load "trie.ss")

    (load "store.ss")

    (load "xrp.ss")
    (load "factor.ss")
    (load "mcmc-state.ss")


    (load "larjmcmc-util.ss")

    (load "counterfactual-update.ss")

    ) )
