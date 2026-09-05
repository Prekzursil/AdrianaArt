# Coverage receipt — clearShopReturnContext / initScrollRestoreFromSession

- tip_impl: `305ba6b08cb71e973ad5900a65a98551d4c0079a`
- support_theme: `9523138049fb47766e876e936686292fd83282d3` (theme dark-class isolation)
- branch: `cursor/golden-wu-shop-return-context-coverage-4739`
- N: 3

## Gates

| Gate | Status | Evidence |
|------|--------|----------|
| INNER | pass EXIT:0 TOTAL 2138 | `/tmp/shop15-inner-serial.log` |
| OUTER | outer:blocked Case B | unit-helper slice |
| REPO-VERIFY | pass EXIT:0 backend 3993 frontend 2138 | `/tmp/shop15-verify-serial.log` |
| REVIEW/ADV | pass | bc-7a3a37bf-f14d-57d8-a295-f6136d517aba ; bc-12d52c37-919e-5c68-a3d8-2bb148a42bf1 |
| DRAFT-PR | FORBIDDEN | createPullRequest 403 |
| COUNCIL | **CONDITIONAL** | DraftPR lock |
