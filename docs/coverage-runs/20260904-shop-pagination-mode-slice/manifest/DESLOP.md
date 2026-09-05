# DeSlop — shop pagination mode

| Spec | Branch |
|------|--------|
| setPaginationMode no-op | same mode → return; no cancel/load |
| setPaginationMode switch | cancel debounce; mode; page=1; loadProducts |
| loadMore early (pages) | paginationMode !== load_more → return |
