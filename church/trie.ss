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
