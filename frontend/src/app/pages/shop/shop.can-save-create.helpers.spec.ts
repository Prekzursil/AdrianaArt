import { signal } from '@angular/core';
import { ShopComponent } from './shop.component';

/** Golden WU shop-can-save-create-helpers. */
describe('ShopComponent create-category helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      createSaving: false,
      createNameRo: 'Ro',
      createNameEn: 'En',
      canEditCategories: () => true,
      reorderSaving: signal(false),
      renameSaving: false,
      renameLoading: false,
      creatingCategoryParentSlug: null,
      cancelCreateCategory: jasmine.createSpy('cancelCreate'),
      cancelRenameCategory: jasmine.createSpy('cancelRename'),
      isCreatingRootCategory: function (this: any) {
        return this.creatingCategoryParentSlug === '';
      },
      ...overrides,
    });
    return cmp;
  }

  it('canSaveCreateCategory requires both names and idle', () => {
    expect(bare().canSaveCreateCategory()).toBe(true);
    expect(bare({ createNameRo: ' ' }).canSaveCreateCategory()).toBe(false);
    expect(bare({ createSaving: true }).canSaveCreateCategory()).toBe(false);
  });

  it('toggleCreateRootCategory opens or cancels', () => {
    const cmp = bare();
    cmp.toggleCreateRootCategory();
    expect((cmp as any).creatingCategoryParentSlug).toBe('');
    expect((cmp as any).cancelRenameCategory).toHaveBeenCalled();
    const open = bare({ creatingCategoryParentSlug: '' });
    open.toggleCreateRootCategory();
    expect((open as any).cancelCreateCategory).toHaveBeenCalled();
  });
});
