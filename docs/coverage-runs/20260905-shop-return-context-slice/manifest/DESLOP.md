# DeSlop — shop return context

| Spec | Branch |
|------|--------|
| clearShopReturnContext removes pending shop return session keys | removes pending/url/scroll/at |
| initScrollRestoreFromSession keeps y when pending context matches router url | restoreScrollY from session |
| initScrollRestoreFromSession clears stale pending context | clears when at older than 10m |
