import { ShopComponent } from './shop.component';

/** Golden WU shop-bulk-selected — bulkIsSelected. */
describe('ShopComponent bulkIsSelected (golden WU)', () => {
  function createCmp(selected: string[]) {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    const set = new Set(selected);
    (cmp as any).bulkSelectedProductIds = () => set;
    return cmp;
  }

  it('reports membership against the selected id set', () => {
    const cmp = createCmp(['a', 'b']);
    expect(cmp.bulkIsSelected('a')).toBe(true);
    expect(cmp.bulkIsSelected('b')).toBe(true);
    expect(cmp.bulkIsSelected('c')).toBe(false);
  });
});
