import { ShopComponent } from './shop.component';

/** Golden WU shop-cancel-rename-category -- cancelRenameCategory. */
describe('ShopComponent cancelRenameCategory (golden WU)', () => {
  it('clears rename and merge/delete draft state', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      editingCategorySlug: 'slug',
      renameLoading: true,
      renameSaving: true,
      renameError: 'e',
      renameNameRo: 'ro',
      renameNameEn: 'en',
      categoryImageSavingSlug: 'x',
      categoryImageError: 'ie',
      mergeTargetSlug: 't',
      mergePreviewLoading: true,
      mergePreview: {},
      mergeSaving: true,
      mergeError: 'me',
      deletePreviewLoading: true,
      deletePreview: {},
      deleteSaving: true,
      deleteError: 'de',
    });
    cmp.cancelRenameCategory();
    expect((cmp as any).editingCategorySlug).toBe('');
    expect((cmp as any).renameLoading).toBe(false);
    expect((cmp as any).renameSaving).toBe(false);
    expect((cmp as any).renameError).toBe('');
    expect((cmp as any).renameNameRo).toBe('');
    expect((cmp as any).renameNameEn).toBe('');
    expect((cmp as any).mergeTargetSlug).toBe('');
    expect((cmp as any).mergePreview).toBeNull();
    expect((cmp as any).deletePreview).toBeNull();
    expect((cmp as any).deleteError).toBe('');
  });
});
