import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-coupon-shipping-discount -- couponShippingDiscount. */
describe('CheckoutComponent couponShippingDiscount (golden WU)', () => {
  it('returns 0 unless eligible offer matches current promo', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      appliedCouponOffer: null,
      promo: 'SAVE10',
    });
    expect((cmp as any).couponShippingDiscount()).toBe(0);

    (cmp as any).appliedCouponOffer = {
      eligible: true,
      coupon: { code: 'SAVE10' },
      estimated_shipping_discount_ron: '12.5',
    };
    expect((cmp as any).couponShippingDiscount()).toBe(12.5);

    (cmp as any).promo = 'OTHER';
    expect((cmp as any).couponShippingDiscount()).toBe(0);
  });
});
