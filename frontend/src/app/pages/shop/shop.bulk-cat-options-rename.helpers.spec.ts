import { ShopComponent } from './shop.component';
import type { Category } from '../../core/catalog.service';

/** Golden WU shop-bulk-cat-options-rename — bulkCategoryOptions/Label + cancelRenameCategory (#775 sidecar). */
describe('ShopComponent bulk category option/rename helpers (golden WU)', () => {
  function cat(partial: Partial<Category> & { id: string; name: string; slug: string }): Category {
    return {
      parent_id: null,
      is_visible: true,
      sort_order: 0,
      ...partial,
    } as Category;
  }

  function createCmp(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    const root = cat({ id: 'r1', name: 'Root', slug: 'root' });
    const child = cat({ id: 'c1', name: 'Child', slug: 'child', parent_id: 'r1' });
    const grand = cat({ id: 'g1', name: 'Grand', slug: 'grand', parent_id: 'c1' });
    (cmp as any).rootCategories = [root];
    (cmp as any).getDescendants = jasmine.createSpy('getDescendants').and.returnValue([child, grand]);
    (cmp as any).categoriesById = new Map([
      ['r1', root],
      ['c1', child],
      ['g1', grand],
    ]);
    (cmp as any).editingCategorySlug = 'root';
    (cmp as any).renameLoading = true;
    (cmp as any).renameSaving = true;
    (cmp as any).renameError = 'e';
    (cmp as any).renameNameRo = 'ro';
    (cmp as any).renameNameEn = 'en';
    (cmp as any).categoryImageSavingSlug = 'root';
    (cmp as any).categoryImageError = 'img';
    (cmp as any).mergeTargetSlug = 'x';
    (cmp as any).mergePreviewLoading = true;
    (cmp as any).mergePreview = { ok: true };
    (cmp as any).mergeSaving = true;
    (cmp as any).mergeError = 'm';
    (cmp as any).deletePreviewLoading = true;
    (cmp as any).deletePreview = { ok: true };
    (cmp as any).deleteSaving = true;
    (cmp as any).deleteError = 'd';
    return cmp;
  }

  it('bulkCategoryOptions flattens roots+descendants and drops empty id/name', () => {
    const cmp = createCmp();
    expect(cmp.bulkCategoryOptions().map((c) => c.id)).toEqual(['r1', 'c1', 'g1']);
    (cmp as any).rootCategories = [
      cat({ id: '', name: 'Bad', slug: 'bad' }),
      cat({ id: 'ok', name: '', slug: 'ok' }),
      cat({ id: 'keep', name: 'Keep', slug: 'keep' }),
    ];
    (cmp as any).getDescendants.and.returnValue([]);
    expect(cmp.bulkCategoryOptions().map((c) => c.id)).toEqual(['keep']);
  });

  it('bulkCategoryLabel walks parent ancestry and guards cycles', () => {
    const cmp = createCmp();
    expect(cmp.bulkCategoryLabel((cmp as any).categoriesById.get('g1'))).toBe('Root / Child / Grand');
    const loop = cat({ id: 'loop', name: 'Loop', slug: 'loop', parent_id: 'loop' });
    (cmp as any).categoriesById.set('loop', loop);
    expect(cmp.bulkCategoryLabel(loop)).toBe('Loop');
  });

  it('cancelRenameCategory clears rename/merge/delete draft state', () => {
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
    expect((cmp as any).deleteSaving).toBe(false);
    expect((cmp as any).deleteError).toBe('');
  });
});
