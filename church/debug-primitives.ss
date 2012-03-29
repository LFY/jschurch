(define DEBUG #f)
(define DEBUG-DEP #f)
(define (enable-prov-debug)
  (set! DEBUG-DEP #t))
(define (disable-prov-debug)
  (set! DEBUG-DEP #f))

(define NO-FWD-PROB #f)
(define (disable-fwd-prob) (set! NO-FWD-PROB #t))
(define (enable-fwd-prob) (set! NO-FWD-PROB #f))

(define (display-debug x)
  (if DEBUG (display x) '()))

;; Debugging functions for provenance tracking==================================

(define (church-display-structural-addrs address store)
  (print-structural-addresses store))
(define (display-prov+provenance x+)
  (display (list 'val (erase x+) 'prov (prov->list (prov x+)))))


