import { ShopComponent } from './shop.component';

/** Golden WU shop-bulk-category-label — bulkCategoryLabel. */
describe('ShopComponent bulkCategoryLabel (golden WU)', () => {
  it('joins ancestor names with slash', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    const root = { id: '1', name: 'Root', parent_id: null };
    const child = { id: '2', name: 'Child', parent_id: '1' };
    (cmp as any).categoriesById = new Map([['1', root], ['2', child]]);
    expect(cmp.bulkCategoryLabel(child as any)).toBe('Root / Child');
    expect(cmp.bulkCategoryLabel(root as any)).toBe('Root');
  });
});
