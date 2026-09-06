import { CartComponent } from './cart.component';

/** Golden WU cart-quote-promo-savings — quotePromoSavings. */
describe('CartComponent quotePromoSavings (golden WU)', () => {
  it('adds coupon shipping discount onto quoteDiscount', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).quoteDiscount = () => 12;
    (cmp as any).couponShippingDiscount = () => 3;
    expect(cmp.quotePromoSavings()).toBe(15);
    (cmp as any).quoteDiscount = () => 0;
    (cmp as any).couponShippingDiscount = () => 0;
    expect(cmp.quotePromoSavings()).toBe(0);
  });
});
