import { ShopComponent } from './shop.component';

describe('ShopComponent bulk category options/label + cancelRename (golden WU #775 sidecar)', () => {
  function make(overrides: Record<string, unknown> = {}): any {
    const proto = Object.create(ShopComponent.prototype);
    Object.assign(
      proto,
      {
        rootCategories: [] as any[],
        categoriesById: new Map<string, any>(),
        childrenByParentId: new Map<string, any[]>(),
        editingCategorySlug: 'slug-a',
        renameLoading: true,
        renameSaving: true,
        renameError: 'e',
        renameNameRo: 'ro',
        renameNameEn: 'en',
        categoryImageSavingSlug: 'img',
        categoryImageError: 'ie',
        mergeTargetSlug: 'm',
        mergePreviewLoading: true,
        mergePreview: { x: 1 },
        mergeSaving: true,
        mergeError: 'me',
        deletePreviewLoading: true,
        deletePreview: { y: 2 },
        deleteSaving: true,
        deleteError: 'de',
      },
      overrides,
    );
    return proto;
  }

  it('bulkCategoryOptions flattens roots with descendants that have id+name', () => {
    const root: any = { id: 'r1', name: 'Root', parent_id: null };
    const child: any = { id: 'c1', name: 'Child', parent_id: 'r1' };
    const nameless: any = { id: 'x', name: '', parent_id: 'r1' };
    const cmp = make({
      rootCategories: [root],
      childrenByParentId: new Map<string, any[]>([['r1', [child, nameless]]]),
    });
    const opts = cmp.bulkCategoryOptions();
    expect(opts.map((c: any) => c.id)).toEqual(['r1', 'c1']);
  });

  it('bulkCategoryLabel joins ancestor names with slash separators', () => {
    const root: any = { id: 'r1', name: 'Root', parent_id: null };
    const child: any = { id: 'c1', name: 'Child', parent_id: 'r1' };
    const cmp = make({
      categoriesById: new Map<string, any>([
        ['r1', root],
        ['c1', child],
      ]),
    });
    expect(cmp.bulkCategoryLabel(child)).toBe('Root / Child');
    expect(cmp.bulkCategoryLabel(root)).toBe('Root');
  });

  it('cancelRenameCategory clears rename/merge/delete draft state', () => {
    const cmp = make();
    cmp.cancelRenameCategory();
    expect(cmp.editingCategorySlug).toBe('');
    expect(cmp.renameLoading).toBe(false);
    expect(cmp.renameSaving).toBe(false);
    expect(cmp.renameError).toBe('');
    expect(cmp.renameNameRo).toBe('');
    expect(cmp.renameNameEn).toBe('');
    expect(cmp.categoryImageSavingSlug).toBeNull();
    expect(cmp.categoryImageError).toBe('');
    expect(cmp.mergeTargetSlug).toBe('');
    expect(cmp.mergePreviewLoading).toBe(false);
    expect(cmp.mergePreview).toBeNull();
    expect(cmp.mergeSaving).toBe(false);
    expect(cmp.mergeError).toBe('');
    expect(cmp.deletePreviewLoading).toBe(false);
    expect(cmp.deletePreview).toBeNull();
    expect(cmp.deleteSaving).toBe(false);
    expect(cmp.deleteError).toBe('');
  });
});
