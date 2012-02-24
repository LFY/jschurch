
;; authors: noah goodman

;;this library generates the church-specific header definitions.
;;the header includes:
;;  church-make-xrp
;;  church-apply, church-eval
;;  mcmc helper code.
;;  deterministic (non-higher-order) scheme primitives wrapped up into church- forms. 

;;this should generate scheme compatible with r4rs+srfi1.

;;NOTE: primitive symbols not otherwise defined are assumed to be provided by the target language. this includes, for example, a bunch of random sampling/scoring functions that xrp-preamble will want.


;(library
; (church header)

; (export generate-header)

; (import (rnrs)
;         (scheme-tools srfi-compat :1) ; lists
;         (church readable-scheme)
;         )

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
                           (begin
                             (display-debug "primitive:")
                             (display-debug args)
                             (display-debug "end-primitive:")
                             (list
                              (apply ,(un-prefix-church symb) (extract-vals args))
                              (apply append (extract-provs args)))
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
    (define erase first)
    ;; get the dependencies of a value
    (define prov second)
    ;; add a set of dependencies to a value's dependencies
    (define (prov+ e p)
      (list (erase e) (append (prov e) p)))

   (define church-apply+prov
      (prov-init
        (lambda (address store proc args)
          ,(if *no-forcing*
             `(apply (erase proc) address store args)
             `(apply (church-force address store proc) address store (church-force address store args))
             ))))

    (define DEBUG #f)

    (define (display-debug x)
      (if DEBUG (display x) '()))

    (define (if+prov store condition true-branch false-branch)
      (let* ([res (erase condition)]
             [prov-of-condition (prov condition)])
        (begin
              (display-debug "if:")
              (display-debug condition)
              (display-debug (length condition))
              (display-debug store)
              (display-debug "endif:") 
          (store-add-structural-dep!
            store
            prov-of-condition)
          (if res
            (prov+ (true-branch) prov-of-condition)
            (prov+ (false-branch) prov-of-condition)))))


    ;; (define (extract-vals val-provs)
      ;; (map (lambda (x) (if (procedure? x) x (car x))) val-provs))

    ;; (define (extract-provs val-provs)
      ;; (map cadr (filter (lambda (x) (not (procedure? x))) val-provs)))

    (define (fsts xs) (map car xs))
    (define (snds xs) (map cadr xs))

    (define (extract-vals xs) (map (lambda (x) (if (null? x) '() (car x))) xs))
    (define (extract-provs xs) (map (lambda (x) (if (null? x) '() (cadr x))) xs))

    (define (extract-opt-arg pr-pvs)
      (begin
        (display-debug "extract-opt-arg:")
        (display-debug pr-pvs)        
        (make-prov (extract-vals pr-pvs) 
                   (apply append (extract-provs pr-pvs)))))

    (define (apply-prim+prov proc args)
      (begin 
        (display-debug "apply-prim:")
        (display-debug proc)
        (display-debug args)
        (display-debug (length args))
        (display-debug "end-apply-prim:")
        (make-prov
          (apply proc (extract-vals args))
          (apply append (extract-provs args)))))

    (define (apply-prim+prov+addressing address store proc args)
      (make-prov
        (apply proc address store (extract-vals args))
        (apply append (extract-provs args))))

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
             [new-provs (apply append all-provs)]

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
      ;; (make-prov
        ;; (church-apply address store (erase proc) (extract-vals val-provs))
        ;; (apply append (extract-provs val-provs)))))

    ;;;
    ;;stuff for xrps (and dealing with stores):
    (define (make-store xrp-draws xrp-stats score tick enumeration-flag factors structural-addrs) 
      (list xrp-draws xrp-stats score tick enumeration-flag factors structural-addrs))

    (define (make-empty-store) (make-store (make-addbox) (make-addbox) 0.0 0 #f (make-addbox) '()))

    (define store->xrp-draws first)
    (define set-store-xrp-draws! set-car!)

    (define store->factors sixth)
    (define (set-store-factors! store new-factors)
      (define (loop curr n)
        (if (= n 5)
          (set-car! curr new-factors)
          (loop (cdr curr) (+ n 1))))
      (loop store 0))

    (define (set-store-structural-addrs! store structural)
      (define (loop curr n)
        (if (= n 6)
          (set-car! curr structural)
          (loop (cdr curr) (+ n 1))))
      (begin
        (loop store 0)))

    (define (store->structural-addrs store)
      (seventh store))

    (define (store-add-structural-dep! store new-deps)
      (begin 
        (display-debug "store-add-structural-dep:")
        (display-debug (length store))
        (display-debug new-deps)
        (display-debug (store->structural-addrs store))
        (set-store-structural-addrs! store (append (store->structural-addrs store) new-deps))
        (display-debug (store->structural-addrs store))
             ))

    (define store->xrp-stats second)
    (define store->score third)
    (define (set-store-score! store score) (cons (car store) (cons (cadr store) (set-car! (cddr store) score))))
    (define store->tick fourth)
    (define store->enumeration-flag fifth) ;;FIXME: this is a hacky way to deal with enumeration...

    (define (church-reset-store-xrp-draws address store)
      (set-store-xrp-draws! store (make-addbox)))
    (define church-reset-store-xrp-draws+provenance church-reset-store-xrp-draws)
    (define (church-reset-store-factors address store)
      (set-store-factors! store (make-addbox)))
    (define church-reset-store-factors+provenance church-reset-store-factors)
    (define (church-reset-store-structural-addrs address store)
      (set-store-structural-addrs! store '()))
    (define church-reset-store-structural-addrs church-reset-store-structural-addrs+provenance)

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
    (define addbox->values trie->values)
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

    (define 
      (make-factor-instance address args value factor-function ticks should-update?)
      (list address args value factor-function ticks should-update?))
    (define factor-address first)
    (define factor-args second)
    (define factor-value third)
    (define factor-scorer fourth)
    (define factor-ticks fifth)
    (define factor-should-update? sixth)

   (define (church-make-factor address store factor-function)
     (let* ()
       (lambda (address store . args)
         (define new-val '())
         (update-addbox (store->factors store)
                        address
                        (lambda (factor-instance)
                          (let* ([sandbox-store (cons (make-addbox) (cdr store))]
                                 [should-update? #t];;(if (eq? trienone factor-instance) #t (not (equal? (factor-args factor-instance) args)))]
                                 [void (begin (display-debug "should-update:") 
                                              (display-debug should-update?))]
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
                                     should-update?)])
                            (set! new-val val)
                            (set-store-score! store (+ (store->score store) val))
                            new-factor-instance)))
           new-val)))

    (define (church-make-factor-with-provenance address store factor-function+)
      (let* ([factor-function (erase factor-function+)]
             [hyperprov (prov factor-function+)])
        (prov-init (lambda (address store . args+)
                     (define args (extract-vals args+))
                     (define provs (extract-provs args+))

                     (define new-val '())
                     (update-addbox (store->factors store)
                                    address
                                    (lambda (factor-instance)
                                      (let* ([sandbox-store (cons (make-addbox) (cdr store))]
                                             [should-update? #t];;(if (eq? trienone factor-instance) #t (not (equal? (factor-args factor-instance) args)))]
                                             [void (begin (display-debug "should-update:") (display-debug should-update?))]
                                             ;;(apply-fn+prov address sandbox-store sample+ (list (prov-init stats) hyperparams+ (extract-opt-arg val-provs)))
                                             ;;[val (church-apply address sandbox-store factor-function args)]
                                             [val+ (apply-fn+prov address sandbox-store factor-function+ (extract-opt-arg args+))]
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
                                                 should-update?)])
                                        (set! new-val val)
                                        (set-store-score! store (+ (store->score store) val))
                                        new-factor-instance)))
                     (list new-val prov)))))
    ;;note: this assumes that the fns (sample, incr-stats, decr-stats, etc) are church procedures.
    ;;FIXME: what should happen with the store when the sampler is a church random fn? should not accumulate stats/score since these are 'marginalized'.
    (define (church-make-xrp address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support)
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
                                      (structural? #f)
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
                                                                   structural?)))
                                 (set! new-val value)
                                 (insert-addbox (store->xrp-stats store) xrp-address new-stats)
                                 (set-store-score! store (+ (store->score store) incr-score))
                                 new-xrp-draw))))
            new-val))))

(define (church-make-structural-xrp address store xrp-name sample incr-stats decr-stats score init-stats hyperparams proposer support)
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
                                      (structural? #t)
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
                                                                   structural?)))
                                 (set! new-val value)
                                 (insert-addbox (store->xrp-stats store) xrp-address new-stats)
                                 (set-store-score! store (+ (store->score store) incr-score))
                                 new-xrp-draw))))
            new-val))))

(define (church-make-xrp-with-provenance 
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
          )
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
                                      (structural? '())
                                      [db (display-debug "structural:")]
                                      [tmp (if (eq? trienone xrp-draw)
                                             (begin ;; (display-debug (extract-opt-arg val-provs))
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
                                                                   (lambda (address store state) ;;FIXME: clean up this proposer stuff...
                                                                     (let ((store (cons (first (mcmc-state->store state)) (cdr (mcmc-state->store state)))))
                                                                       (church-apply (mcmc-state->address state) store proposer (list args value))))
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
              (display-debug (list new-val (cons address (append hyperprovs provs))))
            (list new-val (cons address (append hyperprovs provs))))
            )))))
    ;;mcmc-state structures consist of a store (which captures xrp state, etc), a score (which includes constraint enforcement), and a return value from applying a nfqp.
    ;;constructor/accessor fns: mcmc-state->xrp-draws, mcmc-state->score, mcmc-state->query-value, church-make-initial-mcmc-state.
    (define (make-mcmc-state store value address) (list store value address))
    (define mcmc-state->store first)
    (define mcmc-state->address third)
    (define (mcmc-state->xrp-draws state) (store->xrp-draws (mcmc-state->store state)))
    (define (mcmc-state->score state)
      (if (not (eq? #t (first (second state))))
        minus-infinity ;;enforce conditioner.
        (store->score (mcmc-state->store state))))

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
                            (store->structural-addrs store)
                            )))
    (church-apply (mcmc-state->address state) store (cdr (second state)) '())))

    ;;this captures the current store/address and packages up an initial mcmc-state.
    ;;should copy here? not needed currently, since counterfactual-update coppies and is only thing aplied to states....
    
    (define (church-make-initial-mcmc-state address store)
      (make-mcmc-state store 'init-val address))

    (define (church-make-initial-mcmc-state+provenance address store)
      (prov-init (make-mcmc-state store 'init-val address)))

    ;; ;;this is like church-make-initial-mcmc-state, but flags the created state to init new xrp-draws at left-most element of support.
    ;; ;;clears the xrp-draws since it is meant to happen when we begin enumeration (so none of the xrp-draws in store can be relevant).
    ;; (define (church-make-initial-enumeration-state address store)
    ;;   (make-mcmc-state (make-store '() (store->xrp-stats store) (store->score store) (store->tick store) #t)
    ;;                    'init-val address))

    ;;this is the key function for doing mcmc -- update the execution of a procedure, with optional changes to xrp-draw values.
    ;;  takes: an mcmc state, a normal-from-proc, and an optional list of interventions (which is is a list of xrp-draw new-value pairs to assert).
    ;;  returns: a new mcmc state and the bw/fw score of any creations and deletions.
    (define (counterfactual-update+provenance state+ nfqp+ . interventions+)
      (let* ([state (erase state+)]
             [nfqp (erase nfqp+)]
             [interventions (extract-vals interventions+)]
             (interv-store (make-store (fold (lambda (interv xrps)
                                               (update-addbox xrps (xrp-draw-address (first interv))
                                                              (lambda (xrp-draw)
                                                                (make-xrp-draw (xrp-draw-address (first interv))
                                                                               (cdr interv)
                                                                               (xrp-draw-name (first interv))
                                                                               (xrp-draw-proposer (first interv))
                                                                               (xrp-draw-ticks (first interv))
                                                                               'dummy-score ;;dummy score which will be replace on update.
                                                                               (xrp-draw-support (first interv))
                                                                               ))))
                                             (copy-addbox (store->xrp-draws (mcmc-state->store state)))
                                             interventions)
                                       (copy-addbox (store->xrp-stats (mcmc-state->store state)))
                                       0.0
                                       (+ 1 (store->tick (mcmc-state->store state))) ;;increment the generation counter.
                                       (store->enumeration-flag (mcmc-state->store state))
                                       (copy-addbox (store->factors (mcmc-state->store state)))
                                       (store->structural-addrs (mcmc-state->store state))
                                       ))
             ;;application of the nfqp happens with interv-store, which is a copy so won't mutate original state.
             ;;after application the store must be captured and put into the mcmc-state.
             (value (erase (church-apply (mcmc-state->address state) interv-store nfqp '())))
             (cd-bw/fw (if (store->enumeration-flag interv-store)
                         0
                         (clean-store interv-store))) ;;FIXME!! need to clean out unused xrp-stats?
             (factor-score-current 
               (if (store->enumeration-flag interv-store)
                 0
                 (clean-store-factors interv-store)))
             ;; (void (begin (display "cdbwfwscore: ") (display cd-bw/fw) (display "factorbwfwscore: ") (display factor-bw/fw)))
             (proposal-state (make-mcmc-state interv-store value (mcmc-state->address state))))
        ;;(list proposal-state (+ cd-bw/fw factor-bw/fw))))
        (prov-init (list proposal-state cd-bw/fw))))

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
                                                                                   ))))
                                                 (copy-addbox (store->xrp-draws (mcmc-state->store state)))
                                                 interventions)
                                           (copy-addbox (store->xrp-stats (mcmc-state->store state)))
                                           0.0
                                           (+ 1 (store->tick (mcmc-state->store state))) ;;increment the generation counter.
                                           (store->enumeration-flag (mcmc-state->store state))
                                           (copy-addbox (store->factors (mcmc-state->store state)))
                                           (store->structural-addrs (mcmc-state->store state))
                                           ))
                 ;;application of the nfqp happens with interv-store, which is a copy so won't mutate original state.
                 ;;after application the store must be captured and put into the mcmc-state.
                 (value (church-apply (mcmc-state->address state) interv-store nfqp '()))
                 (cd-bw/fw (if (store->enumeration-flag interv-store)
                             0
                             (clean-store interv-store))) ;;FIXME!! need to clean out unused xrp-stats?
                 (factor-score-current 
                   (if (store->enumeration-flag interv-store)
                                 0
                                 (clean-store-factors interv-store)))
                 ;; (void (begin (display "cdbwfwscore: ") (display cd-bw/fw) (display "factorbwfwscore: ") (display factor-bw/fw)))
                 (proposal-state (make-mcmc-state interv-store value (mcmc-state->address state))))
            ;;(list proposal-state (+ cd-bw/fw factor-bw/fw))))
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
              [else (if (= (first (xrp-draw-ticks (car draws))) (store->tick store))
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
    (define (clean-store-factors store)
      (let loop ((factors (addbox->values (store->factors store)))
                 (used-factors '())
                 (bw/fw 0.0))
        (cond [(null? factors) 
               (begin 
                 (set-store-factors! store (alist->addbox (map (lambda (d) (cons (factor-address d) d)) used-factors)))
                 bw/fw)]
              [else (if (= (first (factor-ticks (car factors))) (store->tick store))
                      (loop (cdr factors) (cons (car factors) used-factors) (+ bw/fw
                                                                               (factor-value (car factors)) ;; Perform possibly expensive scoring function here.
                                                                               )) 
                      ;;this factor was not used in last update, drop it: 
                      (loop (cdr factors) used-factors bw/fw))])))
    ) )

; )
