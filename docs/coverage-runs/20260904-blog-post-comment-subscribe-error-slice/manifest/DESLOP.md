# DeSlop — blog comment-subscribe error slice

| Spec | Branch |
|------|--------|
| loadCommentSubscription request fails | commentSubscribed=false; loading=false |
| toggleCommentSubscription missing slug | early return; no setCommentSubscription / toast |
| toggleCommentSubscription update fails | revert previous; target.checked; toast.error |
