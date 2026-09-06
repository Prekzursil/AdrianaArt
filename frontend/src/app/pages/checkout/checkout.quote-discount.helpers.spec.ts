import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-quote-discount — quoteDiscount. */
describe('CheckoutComponent quoteDiscount (golden WU)', () => {
  it('returns 0 without quote; otherwise subtotal+fee+tax+shipping-total floored at 0', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).quote = null;
    expect(cmp.quoteDiscount()).toBe(0);
    (cmp as any).quote = { subtotal: 100, fee: 5, tax: 10, shipping: 20, total: 120 };
    expect(cmp.quoteDiscount()).toBe(15);
    (cmp as any).quote = { subtotal: 50, fee: 0, tax: 0, shipping: 0, total: 60 };
    expect(cmp.quoteDiscount()).toBe(0);
  });
});
