import { ShopComponent } from './shop.component';

/** Golden WU — cancelRenameCategory + scrollToFilters/scrollToSort. */
describe('ShopComponent cancelRenameCategory / scroll helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      editingCategorySlug: 'slug',
      renameLoading: true,
      renameSaving: true,
      renameError: 'err',
      renameNameRo: 'ro',
      renameNameEn: 'en',
      categoryImageSavingSlug: 'slug',
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
      ...overrides,
    });
    return cmp;
  }

  it('cancelRenameCategory clears rename/merge/delete draft state', () => {
    const cmp = bare();
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

  it('scrollToFilters no-ops when node is missing', () => {
    const cmp = bare();
    spyOn(document, 'getElementById').and.returnValue(null);
    expect(() => cmp.scrollToFilters()).not.toThrow();
  });

  it('scrollToFilters scrolls when node exists', () => {
    const cmp = bare();
    const el = { scrollIntoView: jasmine.createSpy('scrollIntoView') } as any;
    spyOn(document, 'getElementById').and.returnValue(el);
    cmp.scrollToFilters();
    expect(document.getElementById).toHaveBeenCalledWith('shop-filters');
    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('scrollToSort scrolls actions and focuses sort select after delay', () => {
    const cmp = bare();
    const actions = { scrollIntoView: jasmine.createSpy('scrollIntoView') } as any;
    const select = { focus: jasmine.createSpy('focus') } as any;
    spyOn(document, 'getElementById').and.callFake((id: string) =>
      id === 'shop-actions' ? actions : id === 'shop-sort-select' ? select : null,
    );
    jasmine.clock().install();
    cmp.scrollToSort();
    expect(actions.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    jasmine.clock().tick(350);
    expect(select.focus).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });
});
