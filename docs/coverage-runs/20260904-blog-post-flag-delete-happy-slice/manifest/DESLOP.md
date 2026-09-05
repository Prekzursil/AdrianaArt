# DeSlop — flag/delete happy-path

| Spec | Branch |
|------|--------|
| flagComment prompts then API | canFlag true → prompt → blog.flagComment(id,{reason}) |
| flagComment blank reason | whitespace prompt → reason null |
| deleteComment confirm-accept | canDelete true → confirm true → blog.deleteComment(id) |
