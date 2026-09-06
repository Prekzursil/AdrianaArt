import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-quote-shipping — quoteShipping. */
describe('CheckoutComponent quoteShipping (golden WU)', () => {
  it('returns quote.shipping or 0 when missing', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, { quote: null });
    expect(cmp.quoteShipping()).toBe(0);
    Object.assign(cmp as any, { quote: { shipping: 19 } });
    expect(cmp.quoteShipping()).toBe(19);
  });
});
