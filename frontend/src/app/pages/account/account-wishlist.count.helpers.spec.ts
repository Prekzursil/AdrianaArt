import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU account-wishlist-count-helpers. */
describe('AccountWishlistComponent selection/stock helpers (golden WU)', () => {
  function bare(): AccountWishlistComponent {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    Object.assign(cmp as any, { selected: new Set(['a', 'b']) });
    return cmp;
  }

  it('selectedCount / clearSelection', () => {
    const cmp = bare();
    expect(cmp.selectedCount()).toBe(2);
    cmp.clearSelection();
    expect(cmp.selectedCount()).toBe(0);
  });

  it('isOutOfStock respects backorder', () => {
    const cmp = bare();
    expect(cmp.isOutOfStock({ stock_quantity: 0, allow_backorder: false } as any)).toBe(true);
    expect(cmp.isOutOfStock({ stock_quantity: 0, allow_backorder: true } as any)).toBe(false);
    expect(cmp.isOutOfStock({ stock_quantity: 2, allow_backorder: false } as any)).toBe(false);
  });
});
