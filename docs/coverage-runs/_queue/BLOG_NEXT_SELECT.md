# BLOG_NEXT_SELECT — blog-post uncovered N≈3

**Target:** `frontend/src/app/pages/blog/blog-post.component.ts`  
(no `blog.component.ts`; list surface is `blog-list.component.ts`, already dense on `main`)  
**Spec:** `frontend/src/app/pages/blog/blog-post.component.spec.ts`  
**Grounded:** `origin/main` tip + 14 open `cursor/golden-wu-blog-post-*-coverage-4739` drafts  
**Implement gate:** **BLOCKED** — `make verify` running (pid observed); 14 local/remote golden blog-post branches held. Select-only.

## Claimed (do not retake)

| Branch | Identifiers |
|--------|-------------|
| `…-coverage-4739` | `authorInitials`, `coverImageClass`, `openLightbox`, `nextLightbox` |
| `…-copy-scroll-…` | `copyShareLink`, `scrollToTop`, `hasMeaningfulArticleText` |
| `…-heading-progress-…` | `scrollToHeading`, `updateReadingProgress`, `progressPercent` |
| `…-comments-…` | `rootComments`, `replies`, `canReply` |
| `…-share-…` | `focalPosition`, `shareWhatsApp`, `shareFacebook` |
| `…-comment-subscribe-…` (+error/happy) | `canSubscribeToComments`, `loadCommentSubscription`, `toggleCommentSubscription` |
| `…-comment-sort-page-…` | `setCommentSort`, `goToCommentsPage` |
| `…-flag-delete-…` (+happy) | `canFlag`, `flagComment`, `deleteComment`, `canDelete` |
| `…-reply-delete-…` | `canDelete`, `startReply`, `cancelReply` |
| `…-submit-comment-…` | `submitComment` |
| `…-submit-newsletter-…` | `submitNewsletter` |

## PRIMARY select (N=3) — quick-edit datetime helpers

Pure private helpers at L1522–L1542; feed `saveQuickEdit` / `hydrateQuickEditFromState`. Not in any open draft.

| # | Identifier | Lines | Proposed `it(...)` |
|---|------------|-------|--------------------|
| 1 | `toDateTimeLocal` | 1522–1528 | `toDateTimeLocal returns empty for falsy/invalid and formats a finite Date as YYYY-MM-DDTHH:mm` |
| 2 | `toIsoFromDateTimeLocal` | 1530–1536 | `toIsoFromDateTimeLocal returns null for blank/invalid and ISO for a valid local datetime string` |
| 3 | `isFutureIso` | 1538–1543 | `isFutureIso is false for falsy/invalid/past and true when timestamp is > now+1000ms` |

**Suggested branch:** `cursor/golden-wu-blog-post-datetime-helpers-coverage-4739`  
**Assert style:** call via `(cmp as any).toDateTimeLocal(...)` etc.; spy `Date.now` only for #3.

## ALTERNATE A (N=3) — tag/meta normalizers

| # | Identifier | Lines | Proposed `it(...)` |
|---|------------|-------|--------------------|
| 1 | `normalizeTags` | 1554–1572 | `normalizeTags trims, dedupes case-insensitively, and accepts array or comma-string input` |
| 2 | `sameStringSet` | 1578–1602 | `sameStringSet compares trimmed lowercased membership regardless of order/duplicates` |
| 3 | `getMetaSummary` | 1604–1613 | `getMetaSummary reads string summary or lang-keyed object and returns '' otherwise` |

(`normalizeTagsInput` is a one-line alias of `normalizeTags` — fold into #1, do not count as a fourth.)

## ALTERNATE B (N=3) — lightbox close + prev + author label

| # | Identifier | Lines | Proposed `it(...)` |
|---|------------|-------|--------------------|
| 1 | `closeLightbox` | 1829–1837 | `closeLightbox clears index, removes keydown listener, and restores body overflow` |
| 2 | `prevLightbox` | 1847–1853 | `prevLightbox wraps gallery index backward when open with ≥2 images` |
| 3 | `authorLabel` | 2065–2067 | `authorLabel formats identity via formatIdentity with anonymous fallback` |

(`openLightbox`/`nextLightbox` already claimed by `…-blog-post-coverage-4739`.)

## Deferred (larger / IO-heavy — not this N≈3)

`load`, `loadAdminBlock`, `hydrateQuickEditFromState`, `saveQuickEdit`, `toggleQuickEdit`, `renderPostBody`, `hydrateEmbeds`, `applyEmbedData`, `handleArticleClick`, `copyCode`, `buildShareUrl`, `slugifyHeading`, `setMetaTags`, `setCanonical`, `setErrorMetaTags`, `loadComments`, `loadNeighbors`, `loadRelatedPosts`, `loadMoreFromAuthor`, `measureReadingProgress*`, `updateActiveHeading`, `canEditBlog`, `editBlogPost`, `activeLang`, `cloneMeta`.

## Decision

**Recommend PRIMARY** (`toDateTimeLocal` / `toIsoFromDateTimeLocal` / `isFutureIso`).  
**Do not implement in this run** — verify not idle; blog golden branches held.
