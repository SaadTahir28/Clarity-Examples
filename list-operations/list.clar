(define-data-var removing-integer uint u0)
(define-data-var integers (list 1000 uint) (list u1 u2 u3))

(define-read-only (get-integers)
  (var-get integers)
)

(define-public (add-integer (integer uint))
    (ok (var-set integers (unwrap-panic (as-max-len? (append (get-integers) integer) u1000))))
)

(define-public (remove-integer (integer uint))
    (begin
        (var-set removing-integer integer)
        (ok (var-set integers (unwrap-panic (as-max-len? (filter remove-integer-filter (get-integers)) u1000))))
    )
)

(define-private (remove-integer-filter (integer uint))
    (if (is-eq integer (var-get removing-integer))
        false
    true
    )
)