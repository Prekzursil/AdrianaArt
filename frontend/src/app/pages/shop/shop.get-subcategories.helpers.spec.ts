import { ShopComponent } from './shop.component';

describe('ShopComponent getSubcategories (golden WU)', () => {
  it('returns childrenByParentId entries or empty array', () => {
    const cmp = Object.create(ShopComponent.prototype) as any;
    const parent = { id: 'p1', name: 'Root' };
    const child = { id: 'c1', name: 'Child', parent_id: 'p1' };
    cmp.childrenByParentId = new Map([['p1', [child]]]);
    expect(cmp.getSubcategories(parent)).toEqual([child]);
    expect(cmp.getSubcategories({ id: 'missing', name: 'X' })).toEqual([]);
  });
});
