
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
                             (merge-provs (extract-provs args))
                             ))
                         '()))
    `(define ,symb (lambda (address store . args) (apply ,(un-prefix-church symb) (map (lambda (a) (church-force address store a)) args))))))


(define (generate-special)
  `(
    ;;;
    ;;misc church primitives
    (define (church-apply address store proc args)
      ,(if *no-forcing*
         `(apply proc address store args)
         `(apply (church-force address store proc) address store (church-force address store args))
         ))

    (define (inc-prov+provenance v+)
      (make-prov v+ '()))

    (define (dec-prov+provenance v++)
      (erase v++))

    ;; Transparent lists
    ;; [a+] -> [b+]

    (define church-tr-null+provenance '(() ()))

    ;; ;;(define (tr-list+provenance . xs+) xs+)

    ;; the idea is to only affect the values within

    (define (tr-list+provenance . xs+)
      (make-prov xs+ '()))

    (define (tr-cons+provenance x+ xs+)
      (make-prov
        (cons x+ (erase xs+))
        (prov xs+)))

    (define (tr-car+provenance xs+)
      (car (erase xs+)))

    (define (tr-cdr+provenance xs+)
      (make-prov
        (cdr (erase xs+))
        (prov xs+)))

    (define (tr-list-ref+provenance xs+ i+)
      (let* ([i-prov (prov i+)]
             [elt+ (list-ref (erase xs+) (erase i+))]
             [elt-prov (prov elt+)]
             [elt-val (erase elt+)])
        (make-prov
          elt-val
          (merge-provs (list i-prov elt-prov)))))
      ;; (prov+
        ;; (list-ref (erase xs+) (erase i+))
        ;; (add-prov (prov i+) (prov (list-ref (
   
    (define (list->tr-list+provenance xs+)
      (make-prov
        (map prov-init (erase xs+))
        (prov xs+)))

    (define (tr-list->list+provenance xs+)
      (let* ([list-prov (prov xs+)]
             [vals (extract-vals (erase xs+))]
             [provs (extract-provs xs+)])
        (make-prov vals (merge-provs (cons list-prov provs)))))

    ;; (define (church-tr-map+provenance add store f+ xs+)
    ;;   (if (null? xs+) '()
    ;;     (begin
    ;;       (display xs+)
    ;;       (display (car xs+))
    ;;       (tr-cons (fn+prov add store f+ (car xs+))
    ;;                (church-tr-map+provenance add store f+ (cdr xs+))))))


    ;; ;; (define (tr-list->list+provenance xs+)
    ;; ;;   (let* ([vals (extract-vals xs+)]
    ;; ;;          [provs (extract-provs xs+)])
    ;; ;;     (make-prov vals (merge-provs provs))))

    ;; (define (tr-list-ref+provenance xs+ i)
    ;;   (dec-prov+provenance (list-ref xs+ i)))

    ;; (define (tr-map+provenance f xs)
    ;;   (if (null? xs) '() 
    ;;     (cons (f (dec-prov+provenance (car xs))) (tr-map+provenance (cdr xs)))))

    ;; (define (tr-filter+provenance f xs)
    ;;   (cond
    ;;     [(null? xs) '()]
    ;;     [(f (dec-prov+provenance (car xs))) (cons (car xs) (tr-filter+provenance f (cdr xs)))]
    ;;     [else (tr-filter+provenance f (cdr xs))]))

    ;; (define (tr-zip+provenance . xss)
    ;;   (if (null? (car xss)) '()
    ;;     (cons (map car xss)
    ;;           (tr-zip+provenance (map cdr xss)))))

    ;; (define (tr-fold f z xs)
    ;;   (if (null? xs) z
    ;;     (tr-fold f (f (dec-prov+provenance (car xs)) z) (cdr xs))))


    ;; `(apply proc (cons address (cons store args)))

    ;; ;;requires compile, eval, and environment to be available from underlying scheme....
    ;; (define (church-eval addr store sexpr)
    ;;   ;(display (compile sexpr '()) ))
    ;;   ((eval `(letrec ,(map (lambda (def)
    ;;                          (if (symbol? (cadr def))
    ;;                              (list (cadr def) (caddr def))
    ;;                              `(,(car (cadr def)) (lambda ,(cdr (cadr def)) ,@(cddr def)))))
    ;;                        (compile (list sexpr) '()))
    ;;            church-main)
    ;;         (environment '(rnrs)
    ;;                      '(rnrs mutable-pairs)
    ;;                      '(_srfi :1)
    ;;                      '(rename (church external math-env) (sample-discrete discrete-sampler))
    ;;                      '(rename (only (ikarus) gensym pretty-print exact->inexact) (gensym scheme-gensym))
    ;;                      '(_srfi :19)
    ;;                      '(church compiler)
    ;;                      '(rnrs eval)  ))
    ;;         addr store))
    
    (define church-true #t)
    (define church-false #f)

    (define church-infinity infinity)
    (define church-minus-infinity minus-infinity)
    (define church-nan nan)
    (define church-pi pi)
    
    (define (church-or address store . args) (fold (lambda (x y) (or x y)) #f args))
    (define (church-and address store . args) 
      (fold (lambda (x y) (and x y)) #t args))

    ;;provided for laziness and constraint prop:
    (define (church-force address store val) (if (and (pair? val) (eq? (car val) 'delayed))
                                                 (church-force address store ((cadr val) address store))
                                                 val))

    ;; provenance Stuff
    ;; argument lists

    (define arglist list)

    ;; initialize an annotated value
    (define (make-prov v p)
      (list v p))
    ;; prov-init/erase are lift/extract
    (define (prov-init sexpr)
      (list sexpr '()))
    (define (clear-prov v+)
      (list (car v+) '()))
    (define erase first)
    ;; get the dependencies of a value
    (define prov second)
    ;; add a set of dependencies to a value's dependencies
    (define (prov+ e p)
      (list (erase e) (append (prov e) p)))

    (define (add-prov p ps) (cons p ps))

    (define provs->list (lambda (x) x))
    
    (define (union-provs xs ys)
      (append xs ys))

    
    (define church-apply+prov
      (prov-init
       (lambda (address store proc args)
         ,(if *no-forcing*
              `(apply (erase proc) address store args)
              `(apply (church-force address store proc) address store (church-force address store args))
              ))))
    
    (define DEBUG #f)
    (define DEBUG-DEP #f)

    (define (display-debug x)
      (if DEBUG (display x) '()))

    (define (if+prov store condition true-branch false-branch)
      (let* ([res (erase condition)]
             [prov-of-condition (prov condition)])
        (begin
          (display-debug "if:")
          (display-debug condition)
          (display-debug "endif:") 
          (store-add-structural-dep! store
                                     prov-of-condition)
          (if res
              (prov+ (true-branch) prov-of-condition)
              (prov+ (false-branch) prov-of-condition)))))

    (define (fsts xs) (map car xs))
    (define (snds xs) (map cadr xs))

    (define (extract-vals xs) (map (lambda (x) (if (null? x) '() (car x))) xs))
    
    (define (extract-provs xs) (map (lambda (x) (if (null? x) '() (cadr x))) xs))

    (define (merge-provs xs)
      (apply append xs))

    (define (extract-opt-arg pr-pvs)
      (begin
        (display-debug "extract-opt-arg:")
        (display-debug pr-pvs)        
        (make-prov (extract-vals pr-pvs) 
                   (merge-provs (extract-provs pr-pvs)))))

    (define (display-prov+provenance x+)
      (display (list 'val (erase x+) 'prov (prov x+))))

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
      (begin 
        (display-debug "apply-prim:")
        (display-debug proc)
        (display-debug args)
        (display-debug (length args))
        (display-debug "end-apply-prim:")
        (make-prov
         (apply proc (extract-vals args))
         (merge-provs (extract-provs args)))))

    (define (apply-prim+prov+addressing address store proc args)
      (make-prov
       (apply proc address store (extract-vals args))
       (merge-provs (extract-provs args))))

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
      (let* ([all-vals (extract-vals args+s)]
             [all-provs (extract-provs args+s)]
             [void (begin
                     (display-debug '(in lifted apply:))
                     (display-debug args+s))]
             [split-args+s (if (= (length args+s) 1) 
                               (split-share-prov (car args+s))
                               (append (my-take args+s (- (length args+s) 1))
                                       (split-share-prov (my-last args+s))))]

             [db (begin
                   (display-debug "in-lifted-apply:")
                   (display-debug args+s)
                   (display-debug all-vals))]
             [flattened-vals (if (null? all-vals) '()
                                 (if (= (length all-vals) 1) all-vals
                                     (append (my-take all-vals (- (length all-vals) 1)) 
                                             (my-last all-vals))))]
             [new-provs (merge-provs all-provs)]

             [db (begin
                   (display-debug "lifted-apply:")
                   (display-debug args+s)
                   (display-debug all-vals)
                   (display-debug flattened-vals)
                   (display-debug new-provs)
                   (display-debug split-args+s)
                   (display-debug "end-lifted-apply:")
                   )])
        (apply (erase proc+) address store split-args+s)))

    (define (apply-fn+prov address store proc val-provs)
      (begin
        (display-debug "apply-fn:")
        (display-debug proc)
        (display-debug val-provs)
        (display-debug "end-apply-fn:")
        (church-apply address store (erase proc) val-provs)))

    ;;;
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
        (display-debug "store-add-structural-dep:")
        (display-debug (length store))
        (display-debug new-deps)
        (display-debug (store->structural-addrs store))
        (set-store-structural-addrs! store (append (store->structural-addrs store)
                                                   (filter (lambda (addr) (not (null? addr))) (provs->list new-deps))))
        (display-debug (store->structural-addrs store))
        ))

    (define store->xrp-stats second)
    (define store->score third)
    (define (set-store-score! store score) (cons (car store) (cons (cadr store) (set-car! (cddr store) score))))
    (define store->tick fourth)
    (define store->enumeration-flag fifth) ;;FIXME: this is a hacky way to deal with enumeration...

    (define (church-reset-store-xrp-draws address store)
      (begin
        (display-debug '(in church reset store xrp draws))
        (display-debug (list address store))
        (set-store-xrp-draws! store (make-addbox))))

    (define church-reset-store-xrp-draws+provenance church-reset-store-xrp-draws)
    (define (church-reset-store-factors address store)
      (set-store-factors! store (make-addbox)))
    (define church-reset-store-factors+provenance church-reset-store-factors)
    (define (church-reset-store-structural-addrs address store)
      (set-store-structural-addrs! store '()))
    (define church-reset-store-structural-addrs+provenance church-reset-store-structural-addrs)

    ;;;non-functional trie
    ;;provides: make-empty-trie, copy-trie, trie-insert, trie-lookup, trie-update, trie->values, alist->trie

    (define trienone 'none)

    ;; children is a list [(key-part . trie) ...]
    (define (make-trie val children)
      (pair val children))

    (define (make-empty-trie)
      (make-trie trienone '()))

    (define trie->val car)

    (define trie->children cdr)

    (define (trie-empty? trie)
      (null? (trie->children trie)))

    (define (trie->values trie)
      (define vals '())
      (walk-trie trie (lambda (v) (set! vals (cons v vals))))
      vals)

    ;;apply fn to all the leaves of trie.
    (define (walk-trie trie fn)
      (if (not (eq? trienone (trie->val trie)));(null? (trie->children trie))
          (fn (trie->val trie))
          (map (lambda (c) (walk-trie (cdr c) fn)) (trie->children trie))))

    (define (alist->trie alist)
      (let loop ((alist alist)
                 (trie (make-empty-trie)))
        (if (null? alist)
            trie
            (loop (cdr alist) (trie-insert trie (caar alist) (cdar alist))))))


    ;;walk trie, making new pairs.
    (define (copy-trie trie)
      (make-trie (trie->val trie) (map (lambda (k-t) (cons (car k-t) (copy-trie (cdr k-t)))) (trie->children trie))))

    (define (trie-insert trie key val) (trie-update trie key (lambda (v) val)))
    (define (trie-lookup trie key)
      (define val trienone)
      (trie-update trie key (lambda (v) (set! val v) v))
      val)
    (define (trie-update trie key fn)
      (let loop ((trie trie)
                 (key key))
        (if (null? key)
            (set-car! trie (fn (trie->val trie)))
            (let* ((entry (assoc (car key) (trie->children trie)))
                   (sub-trie (if (eq? #f entry)
                                 (let ((new-child (make-empty-trie)))
                                   (set-cdr! trie (cons (cons (car key) new-child) (trie->children trie)))
                                   new-child)
                                 (cdr entry))))
              (loop sub-trie (cdr key)))))
      trie)

    ;;; trie addbox
    ;;reverse addresses before using them as keys because shared parts are at end... (should do addresses as vectors?)
    (define make-addbox make-empty-trie)
    (define copy-addbox copy-trie)
    (define (insert-addbox addbox address val) (trie-insert addbox (reverse address) val))
    (define (read-addbox addbox address) (trie-lookup addbox (reverse address)))
    (define (update-addbox addbox address fn) (trie-update addbox (reverse address) fn))

;; helper functions for LARJ-MCMC===============================================

(define make-extended-state list)
(define extended-state->before first)
(define extended-state->after second)

(define STATE_SRC_NONE 0)
(define STATE_SRC_1 1)
(define STATE_SRC_2 2)
(define STATE_SRC_BOTH 3)

(define church-STATE_SRC_NONE 0)
(define church-STATE_SRC_1 1)
(define church-STATE_SRC_2 2)
(define church-STATE_SRC_BOTH 3)

(define (xrp-in-state? xrp state)
  (not (eq? 'none (read-addbox (store->xrp-draws (mcmc-state->store state))
                               (xrp-draw-address xrp)))))

(define (which-state-to-perturb-and-new-proposal chosen-xrp state1state2)
  (let* ((state1 (extended-state->before state1state2))
         (state2 (extended-state->after state1state2))
         [void (display state1)])
    (cond 
     [(and (xrp-in-state? chosen-xrp state1) (xrp-in-state? chosen-xrp state2)) ;; the chosen-xrp belongs to both state1 and state2
      (list STATE_SRC_BOTH ((xrp-draw-proposer chosen-xrp) 0 0 state2))] 
     [(xrp-in-state? chosen-xrp state2) ;; the chosen-xrp only belongs to state2
      (list STATE_SRC_2 ((xrp-draw-proposer chosen-xrp) 0 0 state2))] 
     [(xrp-in-state? chosen-xrp state1) ;; the chosen-xrp only belongs to state1
      (list STATE_SRC_1 ((xrp-draw-proposer chosen-xrp) 0 0 state1))] 
     [else
      (error chosen-xrp "Error: chosen xrp not in any of the two states!")])))

;; tricky since proposable is a function P[xrp]+addr_store -> P[bool]
(define (combine-proposable-xrp-draws+provenance state1state2+ proposable?+)
  (let* ([state1state2 (erase state1state2+)]
         [proposable? (lambda (addr store e) (erase ((erase proposable?+) addr store e)))])
    (prov-init (combine-proposable-xrp-draws state1state2 proposable?))))

(define (combine-proposable-xrp-draws state1state2 proposable?)
  (let* ((state1 (extended-state->before state1state2))
         (state2 (extended-state->after state1state2))
         (combined-xrp-draws (fold (lambda (xrp xrps)
                                     (update-addbox xrps (xrp-draw-address xrp) (lambda (xrp-draw) xrp)))
                                   (copy-addbox (store->xrp-draws (mcmc-state->store state1))) 
                                   (addbox->values (store->xrp-draws (mcmc-state->store state2)))))
         (proposable-xrp-draws (filter (lambda (x) (proposable? 'addr 'store x)) (addbox->values combined-xrp-draws))))
    ;;(display 'dimension-of-state1)
    ;;(display (length (filter proposable? (addbox->values (mcmc-state->xrp-draws state1)))))
    ;;(display 'dimension-of-state2)
    ;;(display (length (filter proposable? (addbox->values (mcmc-state->xrp-draws state2)))))
    ;;(display 'dimension-of-the-extended-state-space)
    ;;(display (length proposable-xrp-draws))
    proposable-xrp-draws))

(define (lookup-factor-and-update factors-addbox target-factor)
  (let ((lookup-factor (read-addbox factors-addbox (factor-address target-factor))))
    (if (not (eq? 'none lookup-factor))
        lookup-factor
        target-factor)))

(define (update-f-plus-minus-common-scores state target-f-plus-minus-common)
  (let ([fresh-factors (store->factors (mcmc-state->store state))])
    (map (lambda (factor-instances)
           (map (lambda (factor-instance)
                  (lookup-factor-and-update fresh-factors factor-instance))
                factor-instances))
         target-f-plus-minus-common)))

    ;; fn++: P[P[a] + addr_store -> P[b]]
    ;; (define (update-addbox+provenance addbox+ address+ fn++)
    ;;   (let* ([addbox (erase addbox+)]
    ;;          [address (erase address+)]
    ;;          [fn- (lambda (entry) 
    ;;                 (begin (display entry)
    ;;                        (display (erase ((erase fn++) 'empty-addr 'empty-store (prov-init entry))))
    ;;                        (display 'donewithupdateaddbox)
    ;;                        (erase ((erase fn++) 'empty-addr 'empty-store (prov-init entry)))
    ;;                        ))]) 
    ;;     (trie-update addbox (reverse address) fn-)))
    (define addbox->values trie->values)
    ;; (define (addbox->values+provenance addbox+)
      ;; (prov-init (addbox->values (erase addbox+))))
    (define (alist->addbox alist) (alist->trie (map (lambda (b) (cons (reverse (car b)) (cdr b))) alist)))
    (define addbox-empty? trie-empty?)

    (define (make-xrp-draw address value xrp-name proposer-thunk ticks score support structural)
      (list address value xrp-name proposer-thunk ticks score support structural))

    (define xrp-draw-address first)
    (define xrp-draw-value second)
    (define xrp-draw-name third)
    (define xrp-draw-proposer fourth)
    (define xrp-draw-ticks fifth) ;;ticks is a pair of timer tick when this xrp-draw is touched and previous touch if any.
    (define xrp-draw-score sixth)
    (define xrp-draw-support seventh)
    (define xrp-draw-structural? eighth)

    (define MUST-ANNEAL 0)
    (define AUTO-ANNEAL 1)
    (define MUST-NOT-ANNEAL 2)

    (define (make-factor-instance address args value factor-function ticks should-update? should-anneal?)
      (list address args value factor-function ticks should-update? should-anneal?))

    (define factor-address first)
    (define factor-args second)
    (define factor-value third)
    (define factor-scorer fourth)
    (define factor-ticks fifth)
    (define factor-should-update? sixth)
    (define factor-should-anneal? seventh)

    (define (factor-must-anneal? f) (eq? MUST-ANNEAL (factor-should-anneal? f)))
    (define (factor-must-not-anneal? f) (eq? MUST-NOT-ANNEAL (factor-should-anneal? f)))
    (define (factor-auto-anneal? f) (eq? AUTO-ANNEAL (factor-should-anneal? f)))

    (define (church-make-factor-generic address store factor-function should-anneal)
      (lambda (address store . args)
        (define new-val '())
        (update-addbox (store->factors store)
                       address
                       (lambda (factor-instance)
                         (let* ([sandbox-store (cons (make-addbox) (cdr store))] ;; replace xrp-draws with an empty addbox
                                [should-update? #t] ;; right now, scores of all factors are recaluated;;(if (eq? trienone factor-instance) #t (not (equal? (factor-args factor-instance) args)))]
                                ;; [void (begin (display "should-update:") (display should-update?))]
                                [val (church-apply address sandbox-store factor-function args)]
                                ;; [val (cond
                                ;; [(eq? trienone factor-instance) (factor-function address sandbox-store args)]
                                ;; [(not (equal? (factor-args factor-instance) args)) (factor-function address sandbox-store args)]
                                ;; [else (factor-value factor-instance)])]
                                [last-tick (if (eq? trienone factor-instance) #f
                                               (car (factor-ticks factor-instance)))]
                                [new-factor-instance
                                 (make-factor-instance
                                  address args val factor-function
                                  (cons (store->tick store) last-tick)
                                  should-update?
                                  should-anneal)])
                           (set! new-val val)
                           (set-store-score! store (+ (store->score store) val))
                           new-factor-instance)))
          new-val
        ))

    (define (church-make-factor address store factor-function)
      (church-make-factor-generic address store factor-function AUTO-ANNEAL))

    (define (church-make-factor-annealed address store factor-function)
      (church-make-factor-generic address store factor-function MUST-ANNEAL))

    (define (church-make-factor-frozen address store factor-function)
      (church-make-factor-generic address store factor-function MUST-NOT-ANNEAL))

    (define (church-make-factor-generic+provenance address store factor-function+ should-anneal)
      (let* ([factor-function (erase factor-function+)]
             [hyperprov (prov factor-function+)])
        (prov-init (lambda (address store . args+)
                     (define args (extract-vals args+))
                     (define provs (extract-provs args+))

                     (define new-val '())
                     (update-addbox (store->factors store)
                                    address
                                    (lambda (factor-instance)
                                      (let* (;;[sandbox-store (cons (make-addbox) (cdr store))]
                                             [sandbox-store (make-empty-store)]
                                             [should-update? #t];;(if (eq? trienone factor-instance) #t (not (equal? (factor-args factor-instance) args)))]
                                             [void (begin (display-debug "should-update:") (display-debug should-update?))]
                                             ;;(apply-fn+prov address sandbox-store sample+ (list (prov-init stats) hyperparams+ (extract-opt-arg val-provs)))
                                             ;;[val (church-apply address sandbox-store factor-function args)]
                                             [val+ (apply-fn+prov address sandbox-store 
                                                                  factor-function+ args+)]
                                             [val (erase val+)]
                                             [prov (prov val+)]
                                             ;; [val (cond
                                             ;; [(eq? trienone factor-instance) (factor-function address sandbox-store args)]
                                             ;; [(not (equal? (factor-args factor-instance) args)) (factor-function address sandbox-store args)]
                                             ;; [else (factor-value factor-instance)])]
                                             [last-tick (if (eq? trienone factor-instance) #f
                                                            (car (factor-ticks factor-instance)))]
                                             [new-factor-instance
                                              (make-factor-instance
                                               address args val factor-function
                                               (cons (store->tick store) last-tick)
                                               should-update?
                                               should-anneal)])
                                        (set! new-val val)
                                        (set-store-score! store (+ (store->score store) val))
                                        new-factor-instance)))
                     (list new-val '())))))

    (define (church-make-factor+provenance address store factor-function+)
      (church-make-factor-generic+provenance address store factor-function+ AUTO-ANNEAL))
    (define (church-make-factor-annealed+provenance address store factor-function+)
      (church-make-factor-generic+provenance address store factor-function+ MUST-ANNEAL))
    (define (church-make-factor-frozen+provenance address store factor-function+)
      (church-make-factor-generic+provenance address store factor-function+ MUST-NOT-ANNEAL))
    ;;note: this assumes that the fns (sample, incr-stats, decr-stats, etc) are church procedures.
    ;;FIXME: what should happen with the store when the sampler is a church random fn? should not accumulate stats/score since these are 'marginalized'.
 
    (define (church-make-xrp address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support . maybe-structural)
      (let ([structural (if (not (null? maybe-structural))
                            (first maybe-structural)
                            false)])
        (let* ,(if *no-forcing*
                   '()
                   ;;when we might be lazy must force the input pieces:
                   '((xrp-name (church-force address store xrp-name))
                     (sample (church-force address store sample))
                     (incr-stats (church-force address store incr-stats))
                     (decr-stats (church-force address store decr-stats))
                     (score (church-force address store score))
                     (init-stats (church-force address store init-stats))
                     (hyperparams (church-force address store hyperparams))
                     (proposer (church-force address store proposer))
                     (support (church-force address store support))) )

          ;;reset stats if this is first touch on this tick.
          (update-addbox (store->xrp-stats store)
                         address
                         (lambda (stats)
                           (if (or (eq? trienone stats) (not (= (store->tick store) (second stats))))
                               (list init-stats (store->tick store))
                               stats)))

          (let* ((xrp-address address)
                 (proposer (if (null? proposer)
                               (lambda (address store operands old-value) ;;--> proposed-value forward-log-prob backward-log-prob
                                 (let* ((dec (decr-stats address store old-value (car (read-addbox (store->xrp-stats store) xrp-address)) hyperparams operands))
                                        (decstats (second dec))
                                        (decscore (third dec))
                                        (sandbox-store (cons (make-addbox) (cdr store)));;FIXME: this is a hack to need to isolate random choices in sampler from MH.
                                        (inc (sample address sandbox-store decstats hyperparams operands))
                                        (proposal-value (first inc))
                                        (incscore (third inc)))
                                   (list proposal-value incscore decscore)))
                               proposer))) ;;FIXME!! need to isolate provided proposer from MH...

            ;;the xrp itself: we update the xrp-draw at call address and return the new value.
            (lambda (address store . args)
              (define new-val '())
              (update-addbox (store->xrp-draws store)
                             address
                             (lambda (xrp-draw)
                               ;;FIXME!! check if this is same xrp (ie. if xrp-address has changed)?
                               ;;if this xrp-draw exists and has been touched on this tick, as in mem, don't change score or stats.
                               (if (and (not (eq? trienone xrp-draw)) (equal? (store->tick store) (car (xrp-draw-ticks xrp-draw))))
                                   (begin (set! new-val (xrp-draw-value xrp-draw))
                                          xrp-draw)
                                   (let* ((stats (car (read-addbox (store->xrp-stats store) xrp-address))) ;;FIXME: should only need to find the stats once, then do mutable update...
                                          (support-vals (if (null? support) '() (support address store stats hyperparams args))) 
                                          (sandbox-store (cons (make-addbox) (cdr store)));;FIXME: this is a hack to need to isolate random choices in sampler from MH.
                                          (tmp (if (eq? trienone xrp-draw)
                                                   (sample address sandbox-store stats hyperparams args) 
                                                   (incr-stats address sandbox-store (xrp-draw-value xrp-draw) stats hyperparams args)))
                                        ;(value ,(if *AD* '(if (continuous? (first tmp)) (tapify (first tmp)) (first tmp)) '(first tmp)))
                                          (value (first tmp))
                                          (new-stats (list (second tmp) (store->tick store)))
                                          (incr-score (third tmp)) ;;FIXME: need to catch measure zero xrp situation?
                                          (last-tick (if (eq? trienone xrp-draw)
                                                         #f
                                                         (car (xrp-draw-ticks xrp-draw))))
                                          (new-xrp-draw (make-xrp-draw address
                                                                       value
                                                                       xrp-name
                                                                       (lambda (address store state) ;;FIXME: clean up this proposer stuff...
                                                                         (let ((store (cons (first (mcmc-state->store state)) (cdr (mcmc-state->store state)))))
                                                                           (church-apply (mcmc-state->address state) store proposer (list args value))))
                                                                       (cons (store->tick store) last-tick)
                                                                       incr-score
                                                                       support-vals
                                                                       structural)))
                                     (set! new-val value)
                                     (insert-addbox (store->xrp-stats store) xrp-address new-stats)
                                     (set-store-score! store (+ (store->score store) incr-score))
                                     new-xrp-draw))))
              new-val)))))

    (define (church-make-structural-xrp address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support)
      (church-make-xrp address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support true))

    (define (church-make-xrp+provenance address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support)
      (church-make-xrp+provenance+structural-opt
        address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support false))

    (define (church-make-structural-xrp+provenance address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support)
      (church-make-xrp+provenance+structural-opt
        address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support true))

    (define (church-make-xrp+provenance+structural-opt
             address
             store
             xrp-name+
             sample+
             incr-stats+
             decr-stats+
             score+
             init-stats+
             hyperparams+
             proposer+
             support+
             structural)
      (let* ,(if *no-forcing*
                 '(          
                   ;; [address (erase address+)]
                   ;; [store (erase store+)]
                   [xrp-name (erase xrp-name+)]
                   [sample (erase sample+)]
                   [incr-stats (erase incr-stats+)]
                   [decr-stats (erase decr-stats+)]
                   [score (erase score+)]
                   [init-stats (erase init-stats+)]
                   [hyperparams (erase hyperparams+)]
                   [proposer (erase proposer+)]
                   [support (erase support+)]
                   [hyperprovs (prov hyperparams+)]
                   )
                 ;;when we might be lazy must force the input pieces:
                 '((xrp-name (church-force address store xrp-name))
                   (sample (church-force address store sample))
                   (incr-stats (church-force address store incr-stats))
                   (decr-stats (church-force address store decr-stats))
                   (score (church-force address store score))
                   (init-stats (church-force address store init-stats))
                   (hyperparams (church-force address store hyperparams))
                   (proposer (church-force address store proposer))
                   (support (church-force address store support))) )

        ;;reset stats if this is first touch on this tick.
        (update-addbox (store->xrp-stats store)
                       address
                       (lambda (stats)
                         (if (or (eq? trienone stats) (not (= (store->tick store) (second stats))))
                             (list init-stats (store->tick store))
                             stats)))
        (display-debug "church-make-xrp-with-provenance:")

        (let* ((xrp-address address)
               (proposer (if (null? proposer)
                             (prov-init
                              (lambda (address store operands old-value) ;;--> proposed-value forward-log-prob backward-log-prob
                                (let* (
                                       [void 
                                        (begin
                                          (display-debug '(in churchmakexrpwithprovenance calling decrstats:))
                                          (display-debug (list address store old-value (car (read-addbox (store->xrp-stats store) xrp-address)) hyperparams operands)))]
                                       ;; (dec (decr-stats address store old-value (car (read-addbox (store->xrp-stats store) xrp-address)) hyperparams operands))
                                       [dec (erase (decr-stats address store
                                                               (prov-init old-value)
                                                               (prov-init (car (read-addbox (store->xrp-stats store) xrp-address)))
                                                               (prov-init hyperparams)
                                                               (prov-init operands)))]

                                       (decstats (second dec))
                                       (decscore (third dec))
                                       (sandbox-store (cons (make-addbox) (cdr store)));;FIXME: this is a hack to need to isolate random choices in sampler from MH.
                                       (inc (erase (sample address sandbox-store (prov-init decstats) (prov-init hyperparams) (prov-init operands))))
                                       (proposal-value (first inc))
                                       (incscore (third inc)))
                                  (prov-init (list proposal-value incscore decscore)))))
                             proposer))) ;;FIXME!! need to isolate provided proposer from MH...

          (display-debug "church-make-xrp-with-provenance-actual-xrp:")
          ;;the xrp itself: we update the xrp-draw at call address and return the new value.
          (prov-init (lambda (address store . val-provs)

                       (define void (begin (display-debug "church-make-xrp-start:")
                                           (display-debug val-provs)))
                       (define provs (extract-provs val-provs))
                       (define args (extract-vals val-provs))
                       (define void2 (begin (display-debug "church-make-xrp-after-extract:")))
                       (define new-val '())
                       (update-addbox (store->xrp-draws store)
                                      address
                                      (lambda (xrp-draw)
                                        (begin 
                                          (display-debug "in-actual-update:")
                                          ;;FIXME!! check if this is same xrp (ie. if xrp-address has changed)?
                                          ;;if this xrp-draw exists and has been touched on this tick, as in mem, don't change score or stats.
                                          (if (and (not (eq? trienone xrp-draw)) (equal? (store->tick store) (car (xrp-draw-ticks xrp-draw))))
                                              (begin (set! new-val (xrp-draw-value xrp-draw))
                                                     xrp-draw)
                                              (let* ((stats (car (read-addbox (store->xrp-stats store) xrp-address))) ;;FIXME: should only need to find the stats once, then do mutable update...
                                                     [db (display-debug "stats:")]
                                                     [db (begin
                                                           (display-debug "print-support:")
                                                           (display-debug support)
                                                           (display-debug (list (prov-init stats) hyperparams+ (extract-opt-arg val-provs)))
                                                           (display-debug (apply-fn+prov address store support+ (list (prov-init stats) hyperparams+ (extract-opt-arg val-provs))))
                                                           (display-debug "end-print-support:"))]
                                                     (support-vals (if (null? support) '() (erase (apply-fn+prov address store support+ (list (prov-init stats) hyperparams+ (extract-opt-arg val-provs))))))
                                                     [db (display-debug "support-vals")]
                                                     (sandbox-store (cons (make-addbox) (cdr store)));;FIXME: this is a hack to need to isolate random choices in sampler from MH.
                                                     [db (display-debug "sandbox-store:")]
                                                     [db (display-debug (length sandbox-store))]
                                                     (structural? structural)
                                                     [db (display-debug "structural:")]
                                                     [tmp (if (eq? trienone xrp-draw)
                                                              (begin 
                                                                (display-debug '(in make-xrp+provenance calling sampler))
                                                                (display-debug (list (prov-init stats) hyperparams+ (extract-opt-arg val-provs)))
                                                                (erase (apply-fn+prov address sandbox-store sample+ (list (prov-init stats) hyperparams+ (extract-opt-arg val-provs)))))
                                                              ;;(sample address sandbox-store stats hyperparams args) 
                                                              (erase (apply-fn+prov address sandbox-store incr-stats+ (list (prov-init (xrp-draw-value xrp-draw)) (prov-init stats) hyperparams+ (extract-opt-arg val-provs)))))]
                                        ;(value ,(if *AD* '(if (continuous? (first tmp)) (tapify (first tmp)) (first tmp)) '(first tmp)))
                                                     [db (begin
                                                           (display-debug "tmp:")
                                                           (display-debug tmp))]
                                                     [value (first tmp)]
                                                     [db (begin (display-debug "sampled-val:") (display-debug value))]
                                                     (new-stats (list (second tmp) (store->tick store)))
                                                     (incr-score (third tmp)) ;;FIXME: need to catch measure zero xrp situation?
                                                     (last-tick (if (eq? trienone xrp-draw)
                                                                    #f
                                                                    (car (xrp-draw-ticks xrp-draw))))
                                                     (new-xrp-draw (make-xrp-draw address
                                                                                  value
                                                                                  xrp-name
                                                                                  ;; this is weird, since we don't want this to be wrapped, but it does something that needs to be wrapped. someone kill me now.
                                                                                  (lambda (address store state+) ;;FIXME: clean up this proposer stuff...
                                                                                    (let* ([state (erase state+)])
                                                                                      (let ((store (cons (first (mcmc-state->store state)) (cdr (mcmc-state->store state)))))
                                                                                        (church-apply (mcmc-state->address state) store (erase proposer) (list args value)))))
                                                                                  (cons (store->tick store) last-tick)
                                                                                  incr-score
                                                                                  support-vals
                                                                                  structural?)))
                                                (set! new-val value)
                                                (insert-addbox (store->xrp-stats store) xrp-address new-stats)
                                                (set-store-score! store (+ (store->score store) incr-score))
                                                new-xrp-draw)))))
                       (begin 
                         (display-debug "Thingreturnedfrommakexrpwithprov:")
                         (display-debug (list new-val (add-prov address (union-provs hyperprovs provs))))
                         (list new-val (add-prov address (union-provs hyperprovs provs))))
                       )))))
    (define (print-single-xrp xrp)
      (display (list (xrp-draw-address xrp) (xrp-draw-value xrp))))

    (define (print-mcmc-state-xrps state)
      (map print-single-xrp (addbox->values (mcmc-state->xrp-draws state))))

    ;;mcmc-state structures consist of a store (which captures xrp state, etc), a score (which includes constraint enforcement), and a return value from applying a nfqp.
    ;;constructor/accessor fns: mcmc-state->xrp-draws, mcmc-state->score, mcmc-state->query-value, church-make-initial-mcmc-state.
    (define (make-mcmc-state store value address) (list store value address))
    (define mcmc-state->store first)
    (define mcmc-state->address third)
    (define (mcmc-state->xrp-draws state) (store->xrp-draws (mcmc-state->store state)))
    (define (mcmc-state->diff-factors state) (store->diff-factors (mcmc-state->store state)))
    (define (mcmc-state->score state)
      (if (not (eq? #t (first (second state))))
        minus-infinity ;;enforce conditioner.
        (store->score (mcmc-state->store state))))
    (define (mcmc-state->score+provenance state+-with-val+)
      (prov-init (let* ([state-with-val+ (erase state+-with-val+)])
                   (if (not (eq? #t (first (erase (second state-with-val+)))))
                       minus-infinity
                       (store->score (mcmc-state->store state-with-val+))))))
    ;;compute the gradient of the score of a trace-container wrt any tapified erp values.
    (define (mcmc-state->gradient state)
      (first
       (second
        (xy-gradient-R (lambda (f xrp-draws) (filter-map (lambda (x) (if (tape? (xrp-draw-value x))
                                                               (f (xrp-draw-value x)) ;;FIXME: check structure
                                                               #f))
                                                    xrp-draws)) ;map-independent
                       (addbox->values (mcmc-state->xrp-draws state)) ;x-reverse
                       (mcmc-state->score state) ;y-reverse
                       tapify))))


    ;;this assumes that nfqp returns a thunk, which is the delayed query value. we force (apply) the thunk here, using the store from the current state.
    ;;FIXME: there should be some way better than copying whole store...
    (define (mcmc-state->query-value state)
      (let* ((store (mcmc-state->store state))
             (store (make-store (copy-addbox (store->xrp-draws store))
                                (copy-addbox (store->xrp-stats store))
                                (store->score store)
                                (store->tick store)
                                (store->enumeration-flag store)
                                (copy-addbox (store->factors store))
                                (store->diff-factors store)
                                (store->structural-addrs store)
                                )))
        (church-apply (mcmc-state->address state) store (cdr (second state)) '())))

    (define (mcmc-state->query-value+provenance state+)
      (let* ([state (erase state+)]
             (store (mcmc-state->store state))
             (store (make-store (copy-addbox (store->xrp-draws store))
                                (copy-addbox (store->xrp-stats store))
                                (store->score store)
                                (store->tick store)
                                (store->enumeration-flag store)
                                (copy-addbox (store->factors store))
                                (store->diff-factors store)
                                (store->structural-addrs store)
                                ))
             ;; we need to clear the provenance otherwise if statements in mcmc kernels will wrongly mark xrp's as structural
             [debug (begin (display-debug '(in queryvalue+prov))
                           (display-debug (store->structural-addrs store)))]
             [answer (clear-prov (church-apply (mcmc-state->address state) store (cdr (erase (second state))) '()))]
             )
        (begin
          (display-debug (list '(mcmc-state->query-value answer:) answer))
          answer)))

    ;;this captures the current store/address and packages up an initial mcmc-state.
    ;;should copy here? not needed currently, since counterfactual-update coppies and is only thing aplied to states....
    
    (define (church-make-initial-mcmc-state address store)
      (make-mcmc-state store 'init-val address))

    (define (church-make-initial-mcmc-state+provenance address store)
      (prov-init (make-mcmc-state store (prov-init 'init-val) address)))

    ;; We'd like to update the structural? field of each xrp draw according to structural-addrs in interv-store. This can probably be a separate function.
    (define (xrp-draw-set-structural draw new-str)
      (make-xrp-draw
       (xrp-draw-address draw)
       (xrp-draw-value draw)
       (xrp-draw-name draw)
       (xrp-draw-proposer draw)
       (xrp-draw-ticks draw)
       (xrp-draw-score draw)
       (xrp-draw-support draw)
       new-str))

    
    (define (update-xrp-draw-structural-fields store)
      (let ([draws (store->xrp-draws store)])
        (for-each (lambda (addr)
                    (update-addbox draws
                                   addr 
                                   (lambda (draw) (xrp-draw-set-structural draw #t))))
                  (store->structural-addrs store))))

    (define (store->structural-draws store)
      (filter xrp-draw-structural? (addbox->values (store->xrp-draws store))))

    (define (store->nonstructural-draws store)
      (filter (lambda (d) (not (xrp-draw-structural? d)))
              (addbox->values (store->xrp-draws stre))))


    ;;this is the key function for doing mcmc -- update the execution of a procedure, with optional changes to xrp-draw values.
    ;;  takes: an mcmc state, a normal-from-proc, and an optional list of interventions (which is is a list of xrp-draw new-value pairs to assert).
    ;;  returns: a new mcmc state and the bw/fw score of any creations and deletions.

    ;;  counterfactual update will end up doing:
    ;;  - cleanup of old xrps
    ;;  - cleanup of old factors
    ;;  - resetting diff factors (in larj outer kernel)
    ;;  - updating structural field of xrp draws (when using dynamic analysis)
    ;;  church-mh:
    ;;  - cleanup old xrps :: Store -> IO ()
    ;;  - cleanup old factors :: Store -> IO ()
    ;;  larj:
    ;;  - reset diff factors (outer kernel) :: Store -> IO ()
    ;;  - don't do that (inner kernel)
    ;;  dynamic analysis:
    ;;  - update structural field of xrp draws (and take into account provenance of state+, nfqp+, interventions+) :: Store -> IO ()

    ;; so counterfactual update might take any side effecting function that takes the state as argument.

    (define (print-structural-addresses store)
      (begin
        (display 'structural-addresses:)
        (for-each display
                  (store->structural-addrs store))))

    (define (zip2 xs ys)
      (let loop ([acc '()]
                 [xs xs]
                 [ys ys])
        (cond [(or (null? xs) (null? ys)) (reverse acc)]
              [else
                (loop (cons (list (car xs) (car ys)) acc) (cdr xs) (cdr ys))])))

    (define (print-diff-factor-addrs store)
      (let* ([diff-factors (store->diff-factors store)]
             [f+ (car diff-factors)]
             [f- (cadr diff-factors)]
             [fc (caddr diff-factors)])
        (map (lambda (fs-l) 
               (begin
                 (display (cadr fs-l))
                 (for-each display (map factor-address (car fs-l)))))
             (zip2 (list f+ f- fc) '(f+ f- fc)))))

    ;; the counterfactual update that only affects static kernels
    (define (counterfactual-update state nfqp . interventions)
      (let* ((interv-store (make-store (fold (lambda (interv xrps)
                                               (update-addbox xrps (xrp-draw-address (first interv))
                                                              (lambda (xrp-draw)
                                                                (make-xrp-draw (xrp-draw-address (first interv))
                                                                               (cdr interv)
                                                                               (xrp-draw-name (first interv))
                                                                               (xrp-draw-proposer (first interv))
                                                                               (xrp-draw-ticks (first interv))
                                                                               'dummy-score ;;dummy score which will be replace on update.
                                                                               (xrp-draw-support (first interv))
                                                                               (xrp-draw-structural? (first interv))
                                                                               ))))
                                             (copy-addbox (store->xrp-draws (mcmc-state->store state)))
                                             interventions)
                                       (copy-addbox (store->xrp-stats (mcmc-state->store state)))
                                       0.0
                                       (+ 1 (store->tick (mcmc-state->store state))) ;;increment the generation counter.
                                       (store->enumeration-flag (mcmc-state->store state))
                                       (copy-addbox (store->factors (mcmc-state->store state)))
                                       (store->diff-factors (mcmc-state->store state))
                                       (store->structural-addrs (mcmc-state->store state))
                                       ))
             
             ;;application of the nfqp happens with interv-store, which is a copy so won't mutate original state.
             ;;after application the store must be captured and put into the mcmc-state.
             (value (church-apply (mcmc-state->address state) interv-store nfqp '()))
             (void3 (update-xrp-draw-structural-fields interv-store))
             (void4 (if DEBUG-DEP (begin
                      (display 'counterfactual-update-start+static:)
                      (print-structural-addresses interv-store)
                      (print-diff-factor-addrs interv-store))))
             (cd-bw/fw (if (store->enumeration-flag interv-store)
                           0
                           (clean-store interv-store))) ;;FIXME!! need to clean out unused xrp-stats?
             )
        ;;(display '================)
        ;;(for-each 
        ;;  display (map first (addbox->values (store->xrp-draws interv-store))))

        (when (not (store->enumeration-flag interv-store))
              (clean-store-factors interv-store))
        (let ([proposal-state (make-mcmc-state interv-store value (mcmc-state->address state))])
          (list proposal-state cd-bw/fw))))

    ;; counterfactual update for LARJMCMC kernel which would allow structural changes.
    (define (counterfactual-update-larj state nfqp . interventions)
      (let* ((interv-store (make-store (fold (lambda (interv xrps)
                                               (update-addbox xrps (xrp-draw-address (first interv))
                                                              (lambda (xrp-draw)
                                                                (make-xrp-draw (xrp-draw-address (first interv))
                                                                               (cdr interv)
                                                                               (xrp-draw-name (first interv))
                                                                               (xrp-draw-proposer (first interv))
                                                                               (xrp-draw-ticks (first interv))
                                                                               'dummy-score ;;dummy score which will be replace on update.
                                                                               (xrp-draw-support (first interv))
                                                                               (xrp-draw-structural? (first interv))
                                                                               ))))
                                             (copy-addbox (store->xrp-draws (mcmc-state->store state)))
                                             interventions)
                                       (copy-addbox (store->xrp-stats (mcmc-state->store state)))
                                       0.0
                                       (+ 1 (store->tick (mcmc-state->store state))) ;;increment the generation counter.
                                       (store->enumeration-flag (mcmc-state->store state))
                                       (copy-addbox (store->factors (mcmc-state->store state)))
                                       (store->diff-factors (mcmc-state->store state))
                                       '() ;; empty set of structural addrs
                                       ))
             ;;application of the nfqp happens with interv-store, which is a copy so won't mutate original state.
             ;;after application the store must be captured and put into the mcmc-state.
             (value (church-apply (mcmc-state->address state) interv-store nfqp '()))
             ;;(void (display 'mcmc-state->query-value))
             ;;(void (display ((cdr value))))
             (cd-bw/fw (if (store->enumeration-flag interv-store)
                           0
                           (clean-store interv-store))) ;;FIXME!! need to clean out unused xrp-stats?
             (new-diff-factors (f-plus-minus-common interv-store))
             (void1 (when (not (store->enumeration-flag interv-store))
              (clean-store-factors interv-store)))
             (void2 (set-store-diff-factors! interv-store new-diff-factors))
             (void3 (update-xrp-draw-structural-fields interv-store))
             (void4 (if DEBUG-DEP (begin
                      (display 'counterfactual-update-larj:)
                      (print-structural-addresses interv-store)
                      (print-diff-factor-addrs interv-store))))
             (proposal-state (make-mcmc-state interv-store value (mcmc-state->address state)))
             )
        (list proposal-state cd-bw/fw)))

    ;;we need to pull out the subset of new-state xrp-draws that were touched on this pass,
    ;;at the same time we want to accumulate the bw score of these deleted xrp-draws and the fw score of any new ones.
    ;;FIXME: this doesn't play nice with addbox abstraction, and is linear time in the number of xrp-draws.
    ;;FIXME: this method won't work with caching since used xrp-draws may not get 'touched'...
    ;;FIXME: assumes new choices drawn from the conditional prior -- that's currently true but not general.
    (define (clean-store store)
      (let loop ((draws (addbox->values (store->xrp-draws store)))
                 (used-draws '())
                 (bw/fw 0.0))
        (cond [(null? draws) 
               (begin 
                 (set-store-xrp-draws! store (alist->addbox (map (lambda (d) (cons (xrp-draw-address d) d)) used-draws)))
                 bw/fw)]
              [else (if (= (first (xrp-draw-ticks (car draws))) (store->tick store)) ;; this is a newly updated xrp-draw
                      (if (eq? #f (cdr (xrp-draw-ticks (car draws))))
                        ;;this was a new xrp-draw, accumulate fw prob:
                        (loop (cdr draws) (cons (car draws) used-draws) (- bw/fw
                                                                           (xrp-draw-score (car draws)) ;;NOTE: incremental differs here
                                                                           )) 
                        ;;this xrp-draw existed already:
                        (loop (cdr draws) (cons (car draws) used-draws) bw/fw))
                      ;;this xrp-draw was not used in last update, drop it and accumulate bw prob:
                      (loop (cdr draws) used-draws (+ bw/fw
                                                      (xrp-draw-score (car draws)) ;;NOTE: incremental differs here
                                                      )))])))

    (define (factors->addbox factors)
      (alist->addbox (map (lambda (d) (cons (factor-address d) d)) factors)))
    
    (define (clean-store-factors store)
      (let loop ((factors (addbox->values (store->factors store)))
                 (fresh-factors '()))
        (if (null? factors)
            (set-store-factors! store (factors->addbox fresh-factors))
            (loop (cdr factors) 
                  (if (factor-expired? (car factors) (store->tick store))
                      fresh-factors
                      (cons (car factors) fresh-factors))))))

    (define (factor-new? factor)
      (eq? #f (cdr (factor-ticks factor))))

    (define (factor-expired? factor tick)
      (not (= (first (factor-ticks factor))
              tick)))
    
    ;;delete old factor-instances
    ;;set store of f-plus, f-minus and f-common
    (define (f-plus-minus-common store)
      (let ((result
             (let loop ((factors (addbox->values (store->factors store)))
                        (f-plus '())
                        (f-minus '())
                        (f-common '()))
               (if (null? factors)
                   (list f-plus f-minus f-common)
                   (if (factor-expired? (car factors) (store->tick store))
                       (loop (cdr factors) f-plus (cons (car factors) f-minus) f-common)
                       (if (factor-new? (car factors))
                           (loop (cdr factors) (cons (car factors) f-plus) f-minus f-common)
                           (loop (cdr factors) f-plus f-minus (cons (car factors) f-common))))))))

        (begin
            ;;(display 'f-plus)
            ;;(display (length (first result)))
            ;;(display (first result))
            ;;(display 'f-minus)
            ;;(display (length (second result)))
            ;;(display (second result))
            ;;(display 'f-common)
            ;;(display (length (third result)))
            ;;(display (third result))
            result
        )
        ))


    ) )
