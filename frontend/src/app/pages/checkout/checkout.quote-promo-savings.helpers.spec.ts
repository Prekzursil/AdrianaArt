import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-quote-promo-savings — quotePromoSavings. */
describe('CheckoutComponent quotePromoSavings (golden WU)', () => {
  it('sums quoteDiscount with couponShippingDiscount (floored at 0)', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).quoteDiscount = () => 10;
    (cmp as any).couponShippingDiscount = () => 2.5;
    expect((cmp as any).quotePromoSavings()).toBe(12.5);
    (cmp as any).quoteDiscount = () => -3;
    (cmp as any).couponShippingDiscount = () => 1;
    expect((cmp as any).quotePromoSavings()).toBe(0);
  });
});
