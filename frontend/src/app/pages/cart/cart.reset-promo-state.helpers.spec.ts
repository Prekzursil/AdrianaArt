import { CartComponent } from './cart.component';

/** Golden WU cart-reset-promo-state -- resetPromoState. */
describe('CartComponent resetPromoState (golden WU)', () => {
  it('clears promo fields and applied offer', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      promo: 'SAVE10',
      promoMessage: 'ok',
      promoStatus: 'success',
      promoValid: false,
      appliedCouponOffer: { code: 'SAVE10' },
    });
    (cmp as any).resetPromoState();
    expect((cmp as any).promo).toBe('');
    expect((cmp as any).promoMessage).toBe('');
    expect((cmp as any).promoStatus).toBe('info');
    expect((cmp as any).promoValid).toBe(true);
    expect((cmp as any).appliedCouponOffer).toBeNull();
  });
});
