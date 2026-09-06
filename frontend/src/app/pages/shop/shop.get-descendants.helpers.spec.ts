import { ShopComponent } from './shop.component';

describe('ShopComponent getDescendants (golden WU)', () => {
  it('walks childrenByParentId depth-first', () => {
    const cmp = Object.create(ShopComponent.prototype) as any;
    const root = { id: 'r', name: 'Root' };
    const a = { id: 'a', name: 'A', parent_id: 'r' };
    const b = { id: 'b', name: 'B', parent_id: 'a' };
    cmp.childrenByParentId = new Map([
      ['r', [a]],
      ['a', [b]],
      ['b', []],
    ]);
    expect(cmp.getDescendants(root).map((c: any) => c.id)).toEqual(['a', 'b']);
    expect(cmp.getDescendants({ id: '', name: 'x' })).toEqual([]);
  });
});
