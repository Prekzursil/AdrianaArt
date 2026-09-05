# Coverage receipt — pushUrlState

- tip_impl: `ddb0c9b80fb7cadc353fe3247c4729afce79265c`
- support_theme: `79a7b8db` (cherry-pick theme isolation onto main)
- branch: `cursor/golden-wu-shop-pushurlstate-coverage-4739`
- N: 3

## Gates

| Gate | Status | Evidence |
|------|--------|----------|
| INNER | pass EXIT:0 TOTAL 2138 | `/tmp/shop16-inner-serial.log` |
| OUTER | outer:blocked Case B | unit-helper slice |
| REPO-VERIFY | pass EXIT:0 backend 3993 frontend 2138 | `/tmp/shop16-verify-serial.log` |
| REVIEW/ADV | pass | bc-4196d085-5d20-586a-9ddc-d67f91c19679 ; bc-a5da10dc-0115-58d6-bf27-44cc71a20edb |
| DRAFT-PR | FORBIDDEN | createPullRequest 403 |
| COUNCIL | **CONDITIONAL** | DraftPR lock |
