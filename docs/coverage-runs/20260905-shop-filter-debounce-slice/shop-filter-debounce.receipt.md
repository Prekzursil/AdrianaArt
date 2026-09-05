# Coverage receipt — cancelFilterDebounce / scheduleFilterApply

- tip_impl: `429e745042ba3611ea7955256363b91d57e88a08`
- support_theme: cherry-pick theme isolation onto main
- branch: `cursor/golden-wu-shop-filter-debounce-coverage-4739`
- N: 3

## Gates

| Gate | Status | Evidence |
|------|--------|----------|
| INNER | pass EXIT:0 TOTAL 2138 | `/tmp/shop17-inner2-serial.log` |
| OUTER | outer:blocked Case B | unit-helper slice |
| REPO-VERIFY | pass EXIT:0 backend 3993 frontend 2138 | `/tmp/shop17-verify2-serial.log` |
| REVIEW/ADV | pass (re-council after clearTimeout proof) | bc-307fa064-1ef0-5720-9af5-2b8f5e4dad9c ; bc-d9c290a9-c8f5-5ec8-948a-1cd59a7445e8 |
| DRAFT-PR | FORBIDDEN | createPullRequest 403 |
| COUNCIL | **CONDITIONAL** | DraftPR lock |
