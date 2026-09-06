import { CartComponent } from './cart.component';

/** Golden WU cart-currency — currency getter. */
describe('CartComponent currency (golden WU)', () => {
  it('prefers quote.currency, then first item currency, else RON', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).quote = () => ({ currency: 'EUR' });
    (cmp as any).items = () => [{ currency: 'USD' }];
    expect(cmp.currency).toBe('EUR');
    (cmp as any).quote = () => ({});
    expect(cmp.currency).toBe('USD');
    (cmp as any).items = () => [{}];
    expect(cmp.currency).toBe('RON');
  });
});
