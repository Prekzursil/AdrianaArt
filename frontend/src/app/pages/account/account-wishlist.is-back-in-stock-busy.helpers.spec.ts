import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU tip — isBackInStockBusy. */
describe('AccountWishlistComponent isBackInStockBusy (golden WU)', () => {
  it('reflects backInStockBusy set membership', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    (cmp as any).backInStockBusy = new Set(['busy']);
    expect(cmp.isBackInStockBusy({ id: 'busy' } as any)).toBe(true);
    expect(cmp.isBackInStockBusy({ id: 'idle' } as any)).toBe(false);
  });
});
