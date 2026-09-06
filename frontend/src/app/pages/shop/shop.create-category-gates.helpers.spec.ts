import { ShopComponent } from './shop.component';

describe('ShopComponent create-category gates / trackChip (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      creatingCategoryParentSlug: null as string | null,
      renameSaving: false,
      renameLoading: false,
      createSaving: false,
      createError: '',
      createNameRo: 'x',
      createNameEn: 'y',
      canEditCategories: () => true,
      reorderSaving: () => false,
      cancelCreateCategory: jasmine.createSpy('cancelCreateCategory'),
      cancelRenameCategory: jasmine.createSpy('cancelRenameCategory'),
      ...overrides,
    });
    return cmp;
  }

  it('isCreating* mirrors creatingCategoryParentSlug', () => {
    expect(bare().isCreatingAnyCategory()).toBe(false);
    expect(bare({ creatingCategoryParentSlug: '' }).isCreatingRootCategory()).toBe(true);
    expect(bare({ creatingCategoryParentSlug: 'cat' }).isCreatingSubcategory('cat')).toBe(true);
    expect(bare({ creatingCategoryParentSlug: 'cat' }).isCreatingSubcategory('other')).toBe(false);
  });

  it('trackChip returns chip id', () => {
    expect(bare().trackChip(0, { id: 'tag:blue' } as any)).toBe('tag:blue');
  });

  it('toggleCreateRootCategory cancels or starts root create', () => {
    const open = bare({ creatingCategoryParentSlug: '' });
    open.toggleCreateRootCategory();
    expect((open as any).cancelCreateCategory).toHaveBeenCalled();

    const start = bare();
    start.toggleCreateRootCategory();
    expect(start.creatingCategoryParentSlug).toBe('');
    expect(start.createNameRo).toBe('');
    expect(start.createNameEn).toBe('');
  });

  it('toggleCreateSubcategory cancels or starts subcategory create', () => {
    const ev = {
      preventDefault() {},
      stopPropagation() {},
    } as MouseEvent;
    const open = bare({ creatingCategoryParentSlug: 'parent' });
    open.toggleCreateSubcategory(ev, { slug: 'parent' } as any);
    expect((open as any).cancelCreateCategory).toHaveBeenCalled();

    const start = bare();
    start.toggleCreateSubcategory(ev, { slug: ' parent ' } as any);
    expect(start.creatingCategoryParentSlug).toBe('parent');

    const blocked = bare({ canEditCategories: () => false });
    blocked.toggleCreateSubcategory(ev, { slug: 'x' } as any);
    expect(blocked.creatingCategoryParentSlug).toBeNull();
  });
});
