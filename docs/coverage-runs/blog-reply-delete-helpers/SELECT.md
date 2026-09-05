# SELECT — blog-post reply/delete helpers

Tip-based golden WU covering:
- `startReply(comment)` sets `replyingTo` / clears draft
- `deleteComment(comment)` happy path clears list entry
- `deleteComment` error path surfaces status without throwing
