import { CartComponent } from './cart.component';

/** Golden WU cart-quote-subtotal — quoteSubtotal. */
describe('CartComponent quoteSubtotal (golden WU)', () => {
  it('prefers finite positive quote.subtotal else falls back to subtotal()', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).subtotal = () => 42;
    (cmp as any).quote = () => ({ subtotal: 19.5 });
    expect(cmp.quoteSubtotal()).toBe(19.5);
    (cmp as any).quote = () => ({ subtotal: 0 });
    expect(cmp.quoteSubtotal()).toBe(42);
    (cmp as any).quote = () => ({ subtotal: Number.NaN });
    expect(cmp.quoteSubtotal()).toBe(42);
  });
});
