import { CartComponent } from './cart.component';

/** Golden WU cart-remove -- remove. */
describe('CartComponent remove (golden WU)', () => {
  it('removes item flags and marks promo refresh when successful', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      cart: { remove: jasmine.createSpy('remove') },
      itemErrors: { a: 'e' },
      movingToWishlist: { a: true },
      savingForLater: { a: true },
      promoStatus: 'success',
      pendingPromoRefresh: false,
    });
    cmp.remove('a');
    expect((cmp as any).cart.remove).toHaveBeenCalledWith('a');
    expect((cmp as any).itemErrors.a).toBeUndefined();
    expect((cmp as any).movingToWishlist.a).toBeUndefined();
    expect((cmp as any).savingForLater.a).toBeUndefined();
    expect((cmp as any).pendingPromoRefresh).toBe(true);
  });
});
