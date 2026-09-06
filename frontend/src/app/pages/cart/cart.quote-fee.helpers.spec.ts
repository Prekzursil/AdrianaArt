import { CartComponent } from './cart.component';

/** Golden WU cart-quote-fee — quoteFee. */
describe('CartComponent quoteFee (golden WU)', () => {
  it('returns quote.fee or 0', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).quote = () => ({ fee: 3.25 });
    expect(cmp.quoteFee()).toBe(3.25);
    (cmp as any).quote = () => ({});
    expect(cmp.quoteFee()).toBe(0);
  });
});
