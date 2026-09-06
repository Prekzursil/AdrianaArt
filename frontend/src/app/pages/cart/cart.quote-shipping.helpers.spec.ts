import { CartComponent } from './cart.component';

/** Golden WU cart-quote-shipping — quoteShipping. */
describe('CartComponent quoteShipping (golden WU)', () => {
  it('returns quote.shipping or 0', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).quote = () => ({ shipping: 15 });
    expect(cmp.quoteShipping()).toBe(15);
    (cmp as any).quote = () => ({});
    expect(cmp.quoteShipping()).toBe(0);
  });
});
