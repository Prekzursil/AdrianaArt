# Coverage receipt — account wishlist selection helpers

- tip_impl: `63c44953a8f8e8b0e8c8e8b0e8c8e8b0e8c8e8b0`
- branch: `cursor/golden-wu-account-wishlist-selection-coverage-4739`
- N: 3 (`isSelected`/`toggleSelected`/`selectedCount`, `allSelected`, `toggleSelectAll`/`clearSelection`)
- exclude: newsletter (#743), receipt (#744) arms taken

## Gates

| Gate | Status | Evidence |
|------|--------|----------|
| INNER | pending | focused ng test — account-wishlist.component.spec.ts |
| REPO-VERIFY | deferred | serial karma |
| DRAFT-PR | parent | no gh pr create |

## Slice

| # | Helpers | Arms |
| --- | --- | --- |
| 1 | `isSelected`, `toggleSelected`, `selectedCount` | unchecked → check → second item → uncheck |
| 2 | `allSelected` | empty false; partial false; all true; empty list false |
| 3 | `toggleSelectAll`, `clearSelection` | select all; uncheck all; select all then clear |
