import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU wishlist-back-in-stock-request — backInStockRequest. */
describe('AccountWishlistComponent backInStockRequest (golden WU)', () => {
  it('ensures status then returns request from map', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    let ensured = 0;
    (cmp as any).ensureBackInStockStatus = () => {
      ensured += 1;
    };
    const req = { id: 'r1' };
    (cmp as any).backInStockById = new Map([['p1', { in_stock: false, request: req }]]);
    expect(cmp.backInStockRequest({ id: 'p1' } as any)).toBe(req);
    expect(ensured).toBe(1);
    expect(cmp.backInStockRequest({ id: 'missing' } as any)).toBeNull();
  });
});
