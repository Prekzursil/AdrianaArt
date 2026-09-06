import { ShopComponent } from './shop.component';

/** Golden WU shop-bulk-is-selected — bulkIsSelected. */
describe('ShopComponent bulkIsSelected (golden WU)', () => {
  it('checks membership in bulkSelectedProductIds set', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).bulkSelectedProductIds = () => new Set(['a', 'b']);
    expect(cmp.bulkIsSelected('a')).toBe(true);
    expect(cmp.bulkIsSelected('z')).toBe(false);
  });
});
