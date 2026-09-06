import { CartComponent } from './cart.component';

/** Golden WU cart-apply-promo -- applyPromo. */
describe('CartComponent applyPromo (golden WU)', () => {
  it('clears promo when code is empty after normalize', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      promo: '   ',
      promoValid: false,
      clearPromo: jasmine.createSpy('clearPromo'),
    });
    cmp.applyPromo();
    expect((cmp as any).promo).toBe('');
    expect((cmp as any).promoValid).toBe(true);
    expect((cmp as any).clearPromo).toHaveBeenCalled();
  });
});
