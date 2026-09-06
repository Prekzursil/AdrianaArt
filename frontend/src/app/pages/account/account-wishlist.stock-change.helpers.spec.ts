import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU tip — stockChange. */
describe('AccountWishlistComponent stockChange (golden WU)', () => {
  it('compares baseline stock to current availability', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    (cmp as any).account = {
      wishlist: {
        getBaseline: (id: string) =>
          id === 'a' ? { stock_quantity: 2 } : id === 'b' ? { stock_quantity: 0 } : null,
        effectivePrice: () => 0,
      },
    };
    expect(cmp.stockChange({ id: 'missing', stock_quantity: 1 } as any)).toBeNull();
    expect(cmp.stockChange({ id: 'a', stock_quantity: 0, allow_backorder: false } as any)).toBe('out');
    expect(cmp.stockChange({ id: 'b', stock_quantity: 3 } as any)).toBe('back');
    expect(cmp.stockChange({ id: 'a', stock_quantity: 5 } as any)).toBeNull();
  });
});
