# Coverage receipt — descendants / merge reasons

- tip_impl: `cd6902edfb68a8ad236c76ca2d10cd089fe47bf5`
- branch: `cursor/golden-wu-shop-descendants-coverage-4739`
- N: 3

## Gates

| Gate | Status | Evidence |
|------|--------|----------|
| INNER | pass EXIT:0 TOTAL 2138 | `/tmp/shop20-inner-serial.log` |
| OUTER | outer:blocked Case B | unit-helper slice |
| REPO-VERIFY | pass EXIT:0 backend 3993 frontend 2138 | `/tmp/shop20-verify-serial.log` |
| REVIEW/ADV | pass | bc-2cb695a7-2963-5a7c-bb27-84f5f816aeaa ; bc-28c2e46d-8814-5b30-af0d-c84c6ab1aad0 |
| DRAFT-PR | FORBIDDEN | createPullRequest 403 |
| COUNCIL | **CONDITIONAL** | DraftPR lock |
