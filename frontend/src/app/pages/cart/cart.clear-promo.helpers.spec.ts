import { CartComponent } from './cart.component';

/** Golden WU cart-clear-promo -- clearPromo. */
describe('CartComponent clearPromo (golden WU)', () => {
  it('resets promo state and reloads cart', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      resetPromoState: jasmine.createSpy('resetPromoState'),
      cart: { loadFromBackend: jasmine.createSpy('loadFromBackend') },
    });
    cmp.clearPromo();
    expect((cmp as any).resetPromoState).toHaveBeenCalled();
    expect((cmp as any).cart.loadFromBackend).toHaveBeenCalled();
  });
});
