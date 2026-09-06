import { ShopComponent } from './shop.component';

/** Golden WU shop-bulk-pending-edits-helpers. */
describe('ShopComponent bulk/tree helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    const child = { id: 'c1', slug: 'child' };
    const grand = { id: 'g1', slug: 'grand' };
    const map = new Map<string, any[]>([
      ['root', [child]],
      ['c1', [grand]],
    ]);
    Object.assign(cmp as any, {
      bulkStatus: '',
      bulkCategoryId: '',
      bulkFeatured: '',
      childrenByParentId: map,
      ...overrides,
    });
    return cmp;
  }

  it('bulkHasPendingEdits / resetBulkEdits', () => {
    expect(bare().bulkHasPendingEdits()).toBe(false);
    expect(bare({ bulkStatus: 'draft' }).bulkHasPendingEdits()).toBe(true);
    const cmp = bare({ bulkStatus: 'x', bulkCategoryId: 'y', bulkFeatured: '1' });
    (ShopComponent.prototype as any).resetBulkEdits.call(cmp);
    expect((cmp as any).bulkStatus).toBe('');
    expect((cmp as any).bulkCategoryId).toBe('');
    expect((cmp as any).bulkFeatured).toBe('');
  });

  it('getDescendants walks children map', () => {
    const fn = (ShopComponent.prototype as any).getDescendants.bind(bare());
    expect(fn({ id: 'root' }).map((c: any) => c.id)).toEqual(['c1', 'g1']);
    expect(fn({ id: '' })).toEqual([]);
  });
});
