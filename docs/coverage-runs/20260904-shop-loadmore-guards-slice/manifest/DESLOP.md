# DeSlop — shop loadMore guards

| Spec | Branch |
|------|--------|
| loadMore while loadingMore | early return; no cancel/fetch |
| loadMore with null pageMeta | early return; no cancel/fetch |
| loadMore on last page | nextPage > total_pages; no cancel/fetch; loadingMore stays false |
