import { CartComponent } from './cart.component';

/** Golden WU cart-quote-tax — quoteTax. */
describe('CartComponent quoteTax (golden WU)', () => {
  it('returns quote.tax or 0', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).quote = () => ({ tax: 7 });
    expect(cmp.quoteTax()).toBe(7);
    (cmp as any).quote = () => ({});
    expect(cmp.quoteTax()).toBe(0);
  });
});
