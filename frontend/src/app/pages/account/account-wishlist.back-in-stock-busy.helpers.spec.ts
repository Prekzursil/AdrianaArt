import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU account-wishlist-back-in-stock-busy — isBackInStockBusy. */
describe('AccountWishlistComponent isBackInStockBusy (golden WU)', () => {
  function createCmp(busyIds: string[]) {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    (cmp as any).backInStockBusy = new Set(busyIds);
    return cmp;
  }

  it('reports busy membership by item id', () => {
    const cmp = createCmp(['w1']);
    expect(cmp.isBackInStockBusy({ id: 'w1' } as never)).toBe(true);
    expect(cmp.isBackInStockBusy({ id: 'w2' } as never)).toBe(false);
  });
});
