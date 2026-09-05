import { ShopComponent } from './shop.component';
import type { Category } from '../../core/catalog.service';

/** Golden WU shop-rename-vis — N=3 cancelRenameCategory / canSaveRename / toggleCategoryVisibility guards. */
describe('ShopComponent rename/visibility helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).editingCategorySlug = 'old';
    (cmp as any).renameLoading = true;
    (cmp as any).renameSaving = true;
    (cmp as any).renameError = 'err';
    (cmp as any).renameNameRo = 'ro';
    (cmp as any).renameNameEn = 'en';
    (cmp as any).categoryImageSavingSlug = 'img';
    (cmp as any).categoryImageError = 'img-err';
    (cmp as any).mergeTargetSlug = 'm';
    (cmp as any).mergePreviewLoading = true;
    (cmp as any).mergePreview = { x: 1 };
    (cmp as any).mergeSaving = true;
    (cmp as any).mergeError = 'merge-err';
    (cmp as any).deletePreviewLoading = true;
    (cmp as any).deletePreview = { y: 1 };
    (cmp as any).visibilitySavingSlug = '';
    (cmp as any).createSaving = false;
    (cmp as any).canEditCategories = () => true;
    (cmp as any).reorderSaving = () => false;
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('cancelRenameCategory clears rename/merge/delete editor state', () => {
    const cmp = createCmp();
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
  });

  it('canSaveRename requires both trimmed names and idle rename flags', () => {
    const cmp = createCmp({
      renameLoading: false,
      renameSaving: false,
      renameNameRo: 'Ro',
      renameNameEn: 'En',
    });
    expect(cmp.canSaveRename()).toBe(true);
    expect(
      createCmp({
        renameLoading: true,
        renameSaving: false,
        renameNameRo: 'Ro',
        renameNameEn: 'En',
      }).canSaveRename(),
    ).toBe(false);
    expect(
      createCmp({
        renameLoading: false,
        renameSaving: true,
        renameNameRo: 'Ro',
        renameNameEn: 'En',
      }).canSaveRename(),
    ).toBe(false);
    expect(
      createCmp({
        renameLoading: false,
        renameSaving: false,
        renameNameRo: '  ',
        renameNameEn: 'En',
      }).canSaveRename(),
    ).toBe(false);
    expect(
      createCmp({
        renameLoading: false,
        renameSaving: false,
        renameNameRo: 'Ro',
        renameNameEn: '',
      }).canSaveRename(),
    ).toBe(false);
  });

  it('toggleCategoryVisibility returns early on permission/busy/empty-slug guards', () => {
    const event = {
      preventDefault: jasmine.createSpy('preventDefault'),
      stopPropagation: jasmine.createSpy('stopPropagation'),
    } as any as MouseEvent;
    const category = { slug: 'mugs', is_visible: true } as Category;
    const admin = { updateCategory: jasmine.createSpy('updateCategory') };

    const blocked = createCmp({
      canEditCategories: () => false,
      admin,
    });
    blocked.toggleCategoryVisibility(event, category);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(admin.updateCategory).not.toHaveBeenCalled();
    expect((blocked as any).visibilitySavingSlug).toBe('');

    const busyReorder = createCmp({ reorderSaving: () => true, admin });
    busyReorder.toggleCategoryVisibility(event, category);
    expect(admin.updateCategory).not.toHaveBeenCalled();

    const busyRename = createCmp({ renameSaving: true, renameLoading: false, admin });
    busyRename.toggleCategoryVisibility(event, category);
    expect(admin.updateCategory).not.toHaveBeenCalled();

    const busyCreate = createCmp({
      createSaving: true,
      renameSaving: false,
      renameLoading: false,
      admin,
    });
    busyCreate.toggleCategoryVisibility(event, category);
    expect(admin.updateCategory).not.toHaveBeenCalled();

    const busyVis = createCmp({
      visibilitySavingSlug: 'other',
      renameSaving: false,
      renameLoading: false,
      admin,
    });
    busyVis.toggleCategoryVisibility(event, category);
    expect(admin.updateCategory).not.toHaveBeenCalled();

    const emptySlug = createCmp({ renameSaving: false, renameLoading: false, admin });
    emptySlug.toggleCategoryVisibility(event, { slug: '  ', is_visible: true } as Category);
    expect(admin.updateCategory).not.toHaveBeenCalled();
  });
});
