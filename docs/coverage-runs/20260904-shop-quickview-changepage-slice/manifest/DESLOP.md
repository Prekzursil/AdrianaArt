# DeSlop — shop quickView / changePage

| Spec | Branch |
|------|--------|
| openQuickView non-empty | trim slug; open=true |
| openQuickView blank | early return; state unchanged |
| changePage +1 (pages mode) | cancel debounce; page++; loadProducts |
