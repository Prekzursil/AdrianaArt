import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU tip — backInStockRequest. */
describe('AccountWishlistComponent backInStockRequest (golden WU)', () => {
  it('returns cached request after ensureBackInStockStatus', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    const calls: any[] = [];
    (cmp as any).ensureBackInStockStatus = (item: any) => calls.push(item.id);
    (cmp as any).backInStockById = new Map([['p1', { request: { id: 'r1' } }]]);
    expect(cmp.backInStockRequest({ id: 'p1' } as any)).toEqual({ id: 'r1' });
    expect(calls).toEqual(['p1']);
    (cmp as any).backInStockById = new Map();
    expect(cmp.backInStockRequest({ id: 'p2' } as any)).toBeNull();
  });
});
