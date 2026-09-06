import { ShopComponent } from './shop.component';

/** Golden WU shop-is-creating-category-helpers. */
describe('ShopComponent create/rename helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      creatingCategoryParentSlug: null,
      renameLoading: false,
      renameSaving: false,
      renameNameRo: 'Ro',
      renameNameEn: 'En',
      ...overrides,
    });
    return cmp;
  }

  it('isCreating* tracks parent slug state', () => {
    expect(bare().isCreatingAnyCategory()).toBe(false);
    expect(bare({ creatingCategoryParentSlug: '' }).isCreatingRootCategory()).toBe(true);
    expect(bare({ creatingCategoryParentSlug: '' }).isCreatingAnyCategory()).toBe(true);
    expect(bare({ creatingCategoryParentSlug: 'parent' }).isCreatingSubcategory('parent')).toBe(true);
    expect(bare({ creatingCategoryParentSlug: 'parent' }).isCreatingSubcategory('other')).toBe(false);
  });

  it('canSaveRename requires both names and idle flags', () => {
    expect(bare().canSaveRename()).toBe(true);
    expect(bare({ renameNameRo: '  ' }).canSaveRename()).toBe(false);
    expect(bare({ renameSaving: true }).canSaveRename()).toBe(false);
  });
});
