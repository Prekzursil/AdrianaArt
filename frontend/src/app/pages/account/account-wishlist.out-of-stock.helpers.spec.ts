import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU account-wishlist-out-of-stock — isOutOfStock. */
describe('AccountWishlistComponent isOutOfStock (golden WU)', () => {
  function createCmp() {
    return Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
  }

  it('is out of stock only when qty <= 0 and backorder disallowed', () => {
    const cmp = createCmp();
    expect(cmp.isOutOfStock({ stock_quantity: 0, allow_backorder: false } as never)).toBe(true);
    expect(cmp.isOutOfStock({ stock_quantity: null, allow_backorder: false } as never)).toBe(true);
    expect(cmp.isOutOfStock({ stock_quantity: 0, allow_backorder: true } as never)).toBe(false);
    expect(cmp.isOutOfStock({ stock_quantity: 2, allow_backorder: false } as never)).toBe(false);
  });
});
