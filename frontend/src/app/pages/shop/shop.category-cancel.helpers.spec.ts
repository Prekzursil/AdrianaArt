import { ShopComponent } from './shop.component';

/** Golden WU shop-category-cancel-helpers. */
describe('ShopComponent category cancel helpers (golden WU)', () => {
  function bare(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      editingCategorySlug: 'x',
      renameLoading: true,
      renameSaving: true,
      renameError: 'e',
      renameNameRo: 'ro',
      renameNameEn: 'en',
      categoryImageSavingSlug: 'x',
      categoryImageError: 'e',
      mergeTargetSlug: 't',
      mergePreviewLoading: true,
      mergePreview: {},
      mergeSaving: true,
      mergeError: 'e',
      deletePreviewLoading: true,
      deletePreview: {},
      deleteSaving: true,
      deleteError: 'e',
      creatingCategoryParentSlug: '',
      createSaving: true,
      createError: 'e',
      createNameRo: 'ro',
      createNameEn: 'en',
    });
    return cmp;
  }

  it('cancelRenameCategory clears rename/merge/delete state', () => {
    const cmp = bare();
    cmp.cancelRenameCategory();
    expect((cmp as any).editingCategorySlug).toBe('');
    expect((cmp as any).renameNameRo).toBe('');
    expect((cmp as any).mergePreview).toBeNull();
    expect((cmp as any).deletePreview).toBeNull();
  });

  it('cancelCreateCategory clears create draft', () => {
    const cmp = bare();
    cmp.cancelCreateCategory();
    expect((cmp as any).creatingCategoryParentSlug).toBeNull();
    expect((cmp as any).createNameRo).toBe('');
    expect((cmp as any).createSaving).toBe(false);
  });
});
