import { CartComponent } from './cart.component';

/** Golden WU cart-coupon-shipping-discount — couponShippingDiscount. */
describe('CartComponent couponShippingDiscount (golden WU)', () => {
  it('returns estimated discount only for matching eligible promo', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      appliedCouponOffer: null,
      promo: 'SAVE',
    });
    expect((cmp as any).couponShippingDiscount()).toBe(0);
    Object.assign(cmp as any, {
      appliedCouponOffer: {
        eligible: true,
        coupon: { code: 'SAVE' },
        estimated_shipping_discount_ron: '12.50',
      },
      promo: ' save ',
    });
    expect((cmp as any).couponShippingDiscount()).toBe(12.5);
    Object.assign(cmp as any, { promo: 'OTHER' });
    expect((cmp as any).couponShippingDiscount()).toBe(0);
  });
});
