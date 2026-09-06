import { CartComponent } from './cart.component';

/** Golden WU cart-explain-coupon-rejection — describeCouponReasons. */
describe('CartComponent describeCouponReasons (golden WU)', () => {
  it('falls back and joins translated reason labels', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).translate = {
      instant: (key: string) =>
        ({
          'checkout.couponNotEligible': 'Ineligible',
          'checkout.couponReasons.min_subtotal': 'Min subtotal',
        })[key] || key,
    };
    const fn = (CartComponent.prototype as any).describeCouponReasons as (
      this: CartComponent,
      reasons: string[],
    ) => string;
    expect(fn.call(cmp, [])).toBe('Ineligible');
    expect(fn.call(cmp, ['min_subtotal', 'unknown_code'])).toBe('Min subtotal • unknown_code');
  });
});
