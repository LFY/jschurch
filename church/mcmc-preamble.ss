;; This file contains all of the mcmc code that doesn't mess with
;; states, i.e., all of the stuff at the level of kernels and above.

;; what must be provided elsewhere:
;; counterfactual-update
;; structure handling: mcmc-state->xrp-draws, mcmc-state->score, mcmc-state->query-value.

;; NOTE: since these are church procedures, the xrp-list will accumulate draws due to accept/reject decisions and proposals. will this cause bad slowdown?

;; kernels (mcmc transition distributions) and proposal distributions

(define (generate-mcmc-header) `(

                                 (load "mcmc-util.ss")
                                 (load "mh-kernel.ss")
                                 (load "larj-kernel.ss")

))
