# DeSlop — comment subscribe happy-path

| Spec | Branch |
|------|--------|
| loadCommentSubscription unauth | !isAuthenticated → subscribed false; no getCommentSubscription |
| loadCommentSubscription auth | getCommentSubscription → enabled mirrored; loading cleared |
| toggleCommentSubscription success | canSubscribe → setCommentSubscription + toast.success |
