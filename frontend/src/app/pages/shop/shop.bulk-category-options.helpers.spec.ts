import { ShopComponent } from './shop.component';

/** Golden WU shop-bulk-category-options — bulkCategoryOptions. */
describe('ShopComponent bulkCategoryOptions (golden WU)', () => {
  it('flattens roots with descendants and drops empty id/name', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    const child = { id: 'c1', name: 'Child' } as any;
    const root = { id: 'r1', name: 'Root' } as any;
    (cmp as any).rootCategories = [root, { id: '', name: 'bad' }];
    (cmp as any).getDescendants = (r: any) => (r.id === 'r1' ? [child, { id: 'x', name: '' }] : []);
    const opts = cmp.bulkCategoryOptions();
    expect(opts.map((c: any) => c.id)).toEqual(['r1', 'c1']);
  });
});
