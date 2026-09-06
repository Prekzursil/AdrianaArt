import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-coupon-offer-savings — couponOfferSavings. */
describe('CheckoutComponent couponOfferSavings (golden WU)', () => {
  it('sums discount + shipping discount', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    const fn = (CheckoutComponent.prototype as any).couponOfferSavings as (
      this: CheckoutComponent,
      offer: { estimated_discount_ron: unknown; estimated_shipping_discount_ron: unknown },
    ) => number;
    expect(
      fn.call(cmp, {
        estimated_discount_ron: '10.5',
        estimated_shipping_discount_ron: '2.25',
      }),
    ).toBe(12.75);
    expect(
      fn.call(cmp, {
        estimated_discount_ron: null,
        estimated_shipping_discount_ron: '3',
      }),
    ).toBe(3);
  });
});
