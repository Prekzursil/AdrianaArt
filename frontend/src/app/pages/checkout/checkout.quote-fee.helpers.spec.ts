import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-quote-fee — quoteFee. */
describe('CheckoutComponent quoteFee (golden WU)', () => {
  it('returns quote.fee or 0 when missing', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, { quote: null });
    expect(cmp.quoteFee()).toBe(0);
    Object.assign(cmp as any, { quote: { fee: 12.5 } });
    expect(cmp.quoteFee()).toBe(12.5);
  });
});
