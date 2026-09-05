# DeSlop — shop scroll helpers

| Spec | Branch |
|------|--------|
| scrollToFilters scrolls shop-filters into view when present | scrollIntoView smooth/start |
| scrollToSort no-ops when shop-actions element is missing | missing element early return |
| scrollToSort scrolls shop-actions and focuses sort select after delay | scrollIntoView + focus after 350ms |
