import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU wishlist-is-back-in-stock-busy — isBackInStockBusy. */
describe('AccountWishlistComponent isBackInStockBusy (golden WU)', () => {
  it('tracks busy set membership by product id', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    Object.assign(cmp as any, { backInStockBusy: new Set(['p1']) });
    expect(cmp.isBackInStockBusy({ id: 'p1' } as any)).toBe(true);
    expect(cmp.isBackInStockBusy({ id: 'p2' } as any)).toBe(false);
  });
});
