import { CartComponent } from './cart.component';

/** Golden WU cart-quote-discount — quoteDiscount. */
describe('CartComponent quoteDiscount (golden WU)', () => {
  it('returns non-negative subtotal+fee+tax+shipping-total', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).quote = () => ({ subtotal: 100, fee: 5, tax: 10, shipping: 20, total: 120 });
    expect(cmp.quoteDiscount()).toBe(15);
    (cmp as any).quote = () => ({ subtotal: 50, fee: 0, tax: 0, shipping: 0, total: 60 });
    expect(cmp.quoteDiscount()).toBe(0);
  });
});
