import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU wishlist-price-change — priceChange. */
describe('AccountWishlistComponent priceChange (golden WU)', () => {
  it('returns up/down delta vs baseline or null when unchanged/missing', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    (cmp as any).account = {
      wishlist: {
        getBaseline: (id: string) => (id === 'p1' ? { price: 10 } : null),
        effectivePrice: (item: any) => item.price,
      },
    };
    expect(cmp.priceChange({ id: 'missing', price: 12 } as any)).toBeNull();
    expect(cmp.priceChange({ id: 'p1', price: 10.005 } as any)).toBeNull();
    expect(cmp.priceChange({ id: 'p1', price: 12 } as any)).toEqual({
      direction: 'up',
      delta: 2,
    });
    expect(cmp.priceChange({ id: 'p1', price: 8 } as any)).toEqual({
      direction: 'down',
      delta: 2,
    });
  });
});
