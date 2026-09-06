import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU wishlist-stock-change — stockChange. */
describe('AccountWishlistComponent stockChange (golden WU)', () => {
  it('detects back/out transitions vs baseline stock', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    (cmp as any).account = {
      wishlist: {
        getBaseline: () => ({ stock_quantity: 2 }),
      },
    };
    expect(cmp.stockChange({ stock_quantity: 0, allow_backorder: false } as any)).toBe('out');
    expect(cmp.stockChange({ stock_quantity: 5, allow_backorder: false } as any)).toBeNull();
    (cmp as any).account.wishlist.getBaseline = () => ({ stock_quantity: 0 });
    expect(cmp.stockChange({ stock_quantity: 1, allow_backorder: false } as any)).toBe('back');
    expect(cmp.stockChange({ stock_quantity: 0, allow_backorder: true } as any)).toBe('back');
    (cmp as any).account.wishlist.getBaseline = () => ({ stock_quantity: null });
    expect(cmp.stockChange({ stock_quantity: 0 } as any)).toBeNull();
  });
});
