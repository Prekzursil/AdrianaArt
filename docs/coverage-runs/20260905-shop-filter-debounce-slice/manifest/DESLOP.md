# DeSlop — shop filter debounce

| Spec | Branch |
|------|--------|
| cancelFilterDebounce is a no-op when no timer is pending | early return when filterDebounce undefined |
| cancelFilterDebounce clears a pending filterDebounce handle | clearTimeout + undefined |
| scheduleFilterApply resets page to 1 and arms debounce without loading yet | page=1, timer armed, loadProducts not yet |
