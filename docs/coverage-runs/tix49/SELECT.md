# Tix49 Select — tickets filter / status / helpers

N=3 first specs for `TicketsComponent` (0 prior page specs):

1. statusPillClass mapping (resolved/triaged/fallback)
2. orderKey + orderLabel helpers (reference trim, id fallback, mediumDate stamp)
3. filteredOrders orderQuery filter (empty / match / no-match; re-trigger via orders signal)

Spec: `frontend/src/app/pages/tickets/tickets.component.spec.ts`

Branch: cursor/golden-wu-tickets-filter-coverage-4739
