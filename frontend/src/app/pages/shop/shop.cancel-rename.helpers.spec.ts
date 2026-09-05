import { ShopComponent } from './shop.component';

describe('ShopComponent cancelRenameCategory (golden WU)', () => {
  it('clears rename/merge/delete draft state', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      editingCategorySlug: 'cameras',
      renameLoading: true,
      renameSaving: true,
      renameError: 'e',
      renameNameRo: 'ro',
      renameNameEn: 'en',
      categoryImageSavingSlug: 'cameras',
      categoryImageError: 'img',
      mergeTargetSlug: 't',
      mergePreviewLoading: true,
      mergePreview: {},
      mergeSaving: true,
      mergeError: 'm',
      deletePreviewLoading: true,
      deletePreview: {},
      deleteSaving: true,
      deleteError: 'd',
    });
    cmp.cancelRenameCategory();
    expect((cmp as any).editingCategorySlug).toBe('');
    expect((cmp as any).renameLoading).toBe(false);
    expect((cmp as any).renameSaving).toBe(false);
    expect((cmp as any).renameError).toBe('');
    expect((cmp as any).renameNameRo).toBe('');
    expect((cmp as any).renameNameEn).toBe('');
    expect((cmp as any).categoryImageSavingSlug).toBeNull();
    expect((cmp as any).categoryImageError).toBe('');
    expect((cmp as any).mergeTargetSlug).toBe('');
    expect((cmp as any).mergePreviewLoading).toBe(false);
    expect((cmp as any).mergePreview).toBeNull();
    expect((cmp as any).mergeSaving).toBe(false);
    expect((cmp as any).mergeError).toBe('');
    expect((cmp as any).deletePreviewLoading).toBe(false);
    expect((cmp as any).deletePreview).toBeNull();
    expect((cmp as any).deleteSaving).toBe(false);
    expect((cmp as any).deleteError).toBe('');
  });
});
