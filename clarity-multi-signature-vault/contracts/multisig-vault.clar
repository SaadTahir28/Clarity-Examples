;; multisig-vault

;; Owner
(define-constant contract-owner tx-sender)

;; Errors
(define-constant ERR_OWNER_ONLY (err u100))
(define-constant ERR_ALREADY_LOCKED (err u101))
(define-constant ERR_MORE_VOTES_THAN_MEMBERS_REQUIRED (err u102))
(define-constant ERR_NOT_A_MEMBER (err u103))
(define-constant ERR_VOTES_REQUIRED_NOT_MET (err u104))

;; Variables
(define-data-var members (list 100 principal) (list)) ;; people who can cast vote
(define-data-var votes-required uint u0)
(define-map votes {member: principal, recipient: principal} {decision: bool}) ;; a member can cast vote for a recipient with a decision yes/no (true/false)

;; >> (contract-call? .multisig-vault start (list 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE 'ST1J4G6RR643BCG8G8SR6M2D9Z9KXT2NJDRK3FBTK 'ST20ATRN26N9P05V2F1RHFRV24X8C8M3W54E427B2 'ST21HMSJATHZ888PD0S0SSTWP4J61TCRJYEVQ0STB) u4)
(define-public (start (new-members (list 100 principal)) (new-votes-required uint))
    (begin
        (asserts! (is-eq contract-owner tx-sender) ERR_OWNER_ONLY)
        (asserts! (is-eq (len (var-get members)) u0) ERR_ALREADY_LOCKED)
        (asserts! (>= (len new-members) new-votes-required) ERR_MORE_VOTES_THAN_MEMBERS_REQUIRED)
        (var-set members new-members)
        (var-set votes-required new-votes-required)
        (ok true)
    )
)

;; Change tx-sender to the member address and cast a vote
;; >> (contract-call? 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE.multisig-vault vote 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE true)
(define-public (vote (recipient principal) (decision bool))
    (begin
        (asserts! (is-some (index-of (var-get members) tx-sender)) ERR_NOT_A_MEMBER)
        (ok (map-set votes {member: tx-sender, recipient: recipient} {decision: decision}))
    )
)

;; Lets make it confidential so that only members can see the votes
(define-read-only (get-vote (recipient principal))
    (default-to false (get decision (map-get? votes {member: tx-sender, recipient: recipient})))
)

(define-private (get-member-vote (member principal) (recepient principal))
    (default-to false (get decision (map-get? votes {member: member, recipient: recepient})))
)

(define-private (tally (member principal) (accumulator uint))
    (if (get-member-vote member tx-sender)
        (+ accumulator u1) 
    accumulator
    )
)

(define-read-only (tally-votes)
    (fold tally (var-get members) u0)
)

(define-public (withdraw)
    (let
        (
            (recipient tx-sender)
            (total-votes (tally-votes))
        )
        (asserts! (>= total-votes (var-get votes-required)) ERR_VOTES_REQUIRED_NOT_MET)
        (try! (as-contract (stx-transfer? (stx-get-balance tx-sender) tx-sender recipient))) ;; transfer all tokens in contract to recipient
        (ok total-votes)
    )
)

(define-public (deposit (amount uint))
    (stx-transfer? amount tx-sender (as-contract tx-sender))
)