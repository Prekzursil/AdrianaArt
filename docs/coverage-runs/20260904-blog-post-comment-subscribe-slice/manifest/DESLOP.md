# DeSlop — comment subscribe gates

| Spec | Branch |
|------|--------|
| canSubscribeToComments unauth | !isAuthenticated → false |
| canSubscribeToComments verified | auth + email_verified gate |
| toggleCommentSubscription blocked | !canSubscribe → toast.error + revert; no API |
