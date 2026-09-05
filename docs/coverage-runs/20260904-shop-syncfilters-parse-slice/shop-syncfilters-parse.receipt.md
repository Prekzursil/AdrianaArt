# Coverage receipt — syncFiltersFromQuery / parseBoolean / parsePrice

- tip_impl: `c04296d9447f031c1d1d4f6e04ce3925fb951b24`
- support_fix: `98cc1cfcd00d7bacde87e15abb480367d3d534d4` (theme dark-class isolation; not a coverage ratchet)
- branch: `cursor/golden-wu-shop-setsort-fromquery-coverage-4739`
- N: 3 (allowed sort/page/tags; unknown sort → recommended; parseBoolean/parsePrice coercion)

## Gates

| Gate | Status | Evidence |
|------|--------|----------|
| INNER | pass EXIT:0 TOTAL 2138 + diff-coverage OK | `/tmp/shop12-inner-serial2.log` |
| OUTER | outer:blocked Case B | unit-helper slice; no visual secrets |
| REPO-VERIFY | pass EXIT:0 backend 3993 frontend 2138 | `/tmp/shop12-verify-serial2.log` |
| REVIEW | pass | bc-89c240f0-2e2d-5c5c-9aff-e4afcdc1ffed / review-shop12-c042 |
| ADV-A | pass | bc-a502ea51-74ef-5f4c-92ca-ab1290c2026a / adv-a-shop12-c042 |
| ADV-B | pass | bc-6f87920a-3103-5ec2-960f-078ec5959805 / adv-b-shop12-6f87 |
| ADV-C | pass | bc-5ee57bcf-5bce-56e1-86e1-ccffa5b6a13e / adv-c-shop12-c042 |
| DRAFT-PR | FORBIDDEN | createPullRequest 403 — `/tmp/shop12-draftpr2.log` |
| COUNCIL | **CONDITIONAL** | adversaries agree; DraftPR lock blocks AGREED |

## Notes

- First INNER (`/tmp/shop12-inner-serial.log`) failed 10 theme-surface light-default cases from leftover `:root.dark` pollution; fixed by isolating ThemeService + theme-surface suites before re-INNER.
- DraftPR remains integration-forbidden; seal CONDITIONAL per fleet precedent (shop5–11).
