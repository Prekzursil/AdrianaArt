# Coverage receipt — parseBoolean / parsePrice

- tip_impl: `91f477a630ae1d93aa0d4ede8cf3cc693166e6a1`
- branch: `cursor/golden-wu-shop-parsehelpers-coverage-4739`
- N: 3

## Gates

| Gate | Status | Evidence |
|------|--------|----------|
| INNER | pass EXIT:0 TOTAL 2138 | `/tmp/shop18-inner-serial.log` |
| OUTER | outer:blocked Case B | unit-helper slice |
| REPO-VERIFY | pass EXIT:0 backend 3993 frontend 2138 | `/tmp/shop18-verify-serial.log` |
| REVIEW/ADV | pass | bc-71ffc579-deab-5adc-8fad-016012dbdc28 ; bc-b780c9bb-5650-51df-be08-ccf0070ce7a7 |
| DRAFT-PR | FORBIDDEN | createPullRequest 403 |
| COUNCIL | **CONDITIONAL** | DraftPR lock |
