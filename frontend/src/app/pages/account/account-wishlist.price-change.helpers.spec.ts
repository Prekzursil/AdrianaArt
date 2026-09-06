import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU tip — priceChange. */
describe('AccountWishlistComponent priceChange (golden WU)', () => {
  it('returns direction/delta vs baseline when meaningful', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    (cmp as any).account = {
      wishlist: {
        getBaseline: (id: string) => (id === 'x' ? { price: 10 } : null),
        effectivePrice: (item: any) => Number(item.price),
      },
    };
    expect(cmp.priceChange({ id: 'missing', price: 12 } as any)).toBeNull();
    expect(cmp.priceChange({ id: 'x', price: 10.004 } as any)).toBeNull();
    expect(cmp.priceChange({ id: 'x', price: 12 } as any)).toEqual({ direction: 'up', delta: 2 });
    expect(cmp.priceChange({ id: 'x', price: 7 } as any)).toEqual({ direction: 'down', delta: 3 });
  });
});
