import { CartComponent } from './cart.component';

/** Golden WU cart-quote-total — quoteTotal. */
describe('CartComponent quoteTotal (golden WU)', () => {
  it('prefers finite positive quote total, else cart subtotal', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).quote = () => ({ total: 88 });
    (cmp as any).subtotal = () => 40;
    expect(cmp.quoteTotal()).toBe(88);
    (cmp as any).quote = () => ({ total: 0 });
    expect(cmp.quoteTotal()).toBe(40);
    (cmp as any).quote = () => ({ total: Number.NaN });
    expect(cmp.quoteTotal()).toBe(40);
  });
});
