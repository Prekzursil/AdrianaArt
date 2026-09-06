import { AccountWishlistComponent } from './account-wishlist.component';

describe('AccountWishlistComponent priceChange / stockChange (golden WU)', () => {
  function bare() {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    (cmp as any).account = {
      wishlist: {
        getBaseline: jasmine.createSpy('getBaseline'),
        effectivePrice: jasmine.createSpy('effectivePrice'),
      },
    };
    return cmp;
  }

  it('priceChange returns null without baseline or tiny delta', () => {
    const cmp = bare();
    (cmp as any).account.wishlist.getBaseline.and.returnValue(null);
    expect(cmp.priceChange({ id: 'p1' } as any)).toBeNull();

    (cmp as any).account.wishlist.getBaseline.and.returnValue({ price: 10 });
    (cmp as any).account.wishlist.effectivePrice.and.returnValue(10.005);
    expect(cmp.priceChange({ id: 'p1' } as any)).toBeNull();
  });

  it('priceChange reports up/down deltas', () => {
    const cmp = bare();
    (cmp as any).account.wishlist.getBaseline.and.returnValue({ price: 10 });
    (cmp as any).account.wishlist.effectivePrice.and.returnValue(12);
    expect(cmp.priceChange({ id: 'p1' } as any)).toEqual({ direction: 'up', delta: 2 });
    (cmp as any).account.wishlist.effectivePrice.and.returnValue(7);
    expect(cmp.priceChange({ id: 'p1' } as any)).toEqual({ direction: 'down', delta: 3 });
  });

  it('stockChange detects back/out transitions', () => {
    const cmp = bare();
    (cmp as any).account.wishlist.getBaseline.and.returnValue(null);
    expect(cmp.stockChange({ id: 'p1', stock_quantity: 0 } as any)).toBeNull();

    (cmp as any).account.wishlist.getBaseline.and.returnValue({ stock_quantity: 2 });
    expect(cmp.stockChange({ id: 'p1', stock_quantity: 0, allow_backorder: false } as any)).toBe(
      'out',
    );
    (cmp as any).account.wishlist.getBaseline.and.returnValue({ stock_quantity: 0 });
    expect(cmp.stockChange({ id: 'p1', stock_quantity: 0, allow_backorder: true } as any)).toBe(
      'back',
    );
    expect(cmp.stockChange({ id: 'p1', stock_quantity: 0, allow_backorder: false } as any)).toBeNull();
  });
});
