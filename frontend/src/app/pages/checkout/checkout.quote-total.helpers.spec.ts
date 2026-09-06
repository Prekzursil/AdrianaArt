import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-quote-total — quoteTotal. */
describe('CheckoutComponent quoteTotal (golden WU)', () => {
  it('returns quote.total or falls back to subtotal()', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      quote: null,
      subtotal: () => 42,
    });
    expect(cmp.quoteTotal()).toBe(42);
    Object.assign(cmp as any, { quote: { total: 99 } });
    expect(cmp.quoteTotal()).toBe(99);
  });
});
