import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-apply-coupon-offer-helpers. */
describe('CheckoutComponent applyCouponOffer (golden WU)', () => {
  it('applyCouponOffer sets promo and delegates applyPromo', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      promo: '',
      appliedCouponOffer: null,
      applyPromo: jasmine.createSpy('applyPromo'),
    });
    const offer = { coupon: { code: 'SAVE10' } } as any;
    cmp.applyCouponOffer(offer);
    expect((cmp as any).promo).toBe('SAVE10');
    expect((cmp as any).appliedCouponOffer).toBe(offer);
    expect((cmp as any).applyPromo).toHaveBeenCalled();
  });
});
