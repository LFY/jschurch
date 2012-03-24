;; Transparent lists (for use with provenance tracking)
;; [a+] -> [b+]

(define church-tr-null+provenance '(() ()))

;; ;;(define (tr-list+provenance . xs+) xs+)

;; the idea is to only affect the values within

(define (tr-delete-duplicates+provenance xs+)
  (let ([xs (erase xs+)])
    (make-prov
      (let* ([val-prov-map xs]
             [vals (map erase xs)]
             [shortened (delete-duplicates vals)])
        (map (lambda (x) (assoc x val-prov-map)) shortened))
      (prov xs+))))

(define (tr-list+provenance . xs+)
  (make-prov xs+ empty-prov))

(define (tr-cons+provenance x+ xs+)
  (make-prov
    (cons x+ (erase xs+))
    (prov xs+)))

(define (tr-car+provenance xs+)
  (car (erase xs+)))

(define (tr-cdr+provenance xs+)
  (if (null? xs+) (error "tr-cdr on null tr-list")
    (make-prov
      (cdr (erase xs+))
      (prov xs+))))

(define (tr-list-ref+provenance xs+ i+)
  (let* ([i-prov (prov i+)]
         [elt+ (list-ref (erase xs+) (erase i+))]
         [elt-prov (prov elt+)]
         [elt-val (erase elt+)])
    (make-prov
      elt-val
      (merge-provs i-prov elt-prov))))

(define (list->tr-list+provenance xs+)
  (make-prov
    (map prov-init (erase xs+))
    (prov xs+)))

(define (tr-list->list+provenance xs+)
  (let* ([list-prov (prov xs+)]
         [vals (extract-vals (erase xs+))]
         [provs (extract-provs (erase xs+))])
    (make-prov vals (merge-provs list-prov (merge-list-provs provs)))))
