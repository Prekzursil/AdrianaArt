# Coverage receipt — syncStateFromUrl / buildQueryParams

- tip_impl: `2604998bc21b04cd758bc825b6d141bd129ade1e`
- support_fix: `20ad67ee6f84de869fca87ab3383212508957f6c` (theme dark-class isolation; not a coverage ratchet)
- branch: `cursor/golden-wu-shop-syncstate-buildquery-coverage-4739`
- N: 3 (legacy cat canonicalize; child→parent+sub; buildQueryParams omit/emit)

## Gates

| Gate | Status | Evidence |
|------|--------|----------|
| INNER | pass EXIT:0 TOTAL 2138 + diff-coverage OK | `/tmp/shop13-inner-serial.log` |
| OUTER | outer:blocked Case B | unit-helper slice; no visual secrets |
| REPO-VERIFY | pass EXIT:0 backend 3993 frontend 2138 | `/tmp/shop13-verify-serial.log` |
| REVIEW | pass | bc-9de8f5aa-7ded-58e7-a8fb-cc6745380141 / review-shop13-2604998b |
| ADV-A/B | pass | bc-7b05fada-723c-5a0a-b99c-2ff715945e43 / adv-ab-shop13-2604998b |
| DRAFT-PR | FORBIDDEN | createPullRequest 403 — `/tmp/shop13-draftpr.log` |
| COUNCIL | **CONDITIONAL** | adversaries agree; DraftPR lock blocks AGREED |
