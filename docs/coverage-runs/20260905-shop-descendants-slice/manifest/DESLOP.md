# DeSlop — shop descendants / merge reasons

| Spec | Branch |
|------|--------|
| activeLeafCategorySlug returns subcategory, leaf slug, or null for sale/parent-with-children | empty/sale/sub/parent/leaf |
| getDescendants recursively flattens the category subtree | depth-2 flatten + empty id |
| mergeReasonKey maps known reasons and falls back to mergeNotAllowed | same/parent/children/default |
