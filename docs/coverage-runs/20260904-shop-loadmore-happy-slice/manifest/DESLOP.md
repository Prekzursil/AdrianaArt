# DeSlop — shop loadMore happy / append

| Spec | Branch |
|------|--------|
| loadMore guards pass | cancel debounce; page++; loadingMore; fetchProducts(true) |
| fetchProducts append | concatenates items; updates pageMeta; clears loadingMore |
| fetchProducts append error | page--; loadingMore false; toast.error |
