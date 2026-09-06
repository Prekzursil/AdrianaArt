import { AccountWishlistComponent } from './account-wishlist.component';

describe('AccountWishlistComponent isOutOfStock / isBackInStockBusy (golden WU)', () => {
  function bare() {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    (cmp as any).backInStockBusy = new Set<string>();
    return cmp;
  }

  it('isOutOfStock respects stock_quantity and allow_backorder', () => {
    const cmp = bare();
    expect(cmp.isOutOfStock({ stock_quantity: 2, allow_backorder: false } as any)).toBe(false);
    expect(cmp.isOutOfStock({ stock_quantity: 0, allow_backorder: false } as any)).toBe(true);
    expect(cmp.isOutOfStock({ stock_quantity: 0, allow_backorder: true } as any)).toBe(false);
    expect(cmp.isOutOfStock({ stock_quantity: null, allow_backorder: false } as any)).toBe(true);
  });

  it('isBackInStockBusy reads busy set', () => {
    const cmp = bare();
    expect(cmp.isBackInStockBusy({ id: 'p1' } as any)).toBe(false);
    (cmp as any).backInStockBusy.add('p1');
    expect(cmp.isBackInStockBusy({ id: 'p1' } as any)).toBe(true);
  });
});
