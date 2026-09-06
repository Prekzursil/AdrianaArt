import { CartComponent } from './cart.component';

/** Golden WU cart-clear-cart -- clearCart. */
describe('CartComponent clearCart (golden WU)', () => {
  it('clears cart state when confirm succeeds', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    spyOn(window, 'confirm').and.returnValue(true);
    Object.assign(cmp as any, {
      translate: { instant: jasmine.createSpy('instant').and.returnValue('ok?') },
      cart: { clear: jasmine.createSpy('clear') },
      itemErrors: { a: 'x' },
      movingToWishlist: { a: true },
      resetPromoState: jasmine.createSpy('resetPromoState'),
    });
    cmp.clearCart();
    expect((cmp as any).cart.clear).toHaveBeenCalled();
    expect((cmp as any).itemErrors).toEqual({});
    expect((cmp as any).movingToWishlist).toEqual({});
    expect((cmp as any).resetPromoState).toHaveBeenCalled();
  });

  it('no-ops when confirm is cancelled', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    spyOn(window, 'confirm').and.returnValue(false);
    Object.assign(cmp as any, {
      translate: { instant: () => 'ok?' },
      cart: { clear: jasmine.createSpy('clear') },
      resetPromoState: jasmine.createSpy('resetPromoState'),
    });
    cmp.clearCart();
    expect((cmp as any).cart.clear).not.toHaveBeenCalled();
    expect((cmp as any).resetPromoState).not.toHaveBeenCalled();
  });
});
