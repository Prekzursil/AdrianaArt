import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU wishlist-is-out-of-stock — isOutOfStock. */
describe('AccountWishlistComponent isOutOfStock (golden WU)', () => {
  it('is true only when stock <= 0 and backorder disallowed', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    expect(cmp.isOutOfStock({ stock_quantity: 0, allow_backorder: false } as any)).toBe(true);
    expect(cmp.isOutOfStock({ stock_quantity: 0, allow_backorder: true } as any)).toBe(false);
    expect(cmp.isOutOfStock({ stock_quantity: 2, allow_backorder: false } as any)).toBe(false);
    expect(cmp.isOutOfStock({} as any)).toBe(true);
  });
});
