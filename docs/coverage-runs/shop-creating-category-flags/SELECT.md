# SELECT — shop creating-category flags (N=3)

Targets on `ShopComponent`:

1. `isCreatingAnyCategory()`
2. `isCreatingRootCategory()`
3. `isCreatingSubcategory(slug)`

Non-overlapping with create-cancel helpers (canSaveCreateCategory / cancel*).
