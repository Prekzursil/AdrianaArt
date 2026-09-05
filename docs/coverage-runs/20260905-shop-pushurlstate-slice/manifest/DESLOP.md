# DeSlop — shop pushUrlState

| Spec | Branch |
|------|--------|
| pushUrlState navigates to /shop with replaceUrl when no category slug | commands=['/shop'], replaceUrl=true |
| pushUrlState navigates to /shop/:slug when category slug is set | commands=['/shop', slug], replaceUrl=false |
| pushUrlState forwards non-default search filter as q query param | buildQueryParams.q from filters.search |
