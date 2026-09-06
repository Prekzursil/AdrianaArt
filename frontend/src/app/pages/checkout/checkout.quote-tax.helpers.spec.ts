import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-quote-tax — quoteTax. */
describe('CheckoutComponent quoteTax (golden WU)', () => {
  function bare(quote: any): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, { quote });
    return cmp;
  }

  it('returns quote.tax or 0', () => {
    expect(bare({ tax: 3.5 }).quoteTax()).toBe(3.5);
    expect(bare(null).quoteTax()).toBe(0);
    expect(bare({}).quoteTax()).toBe(0);
  });
});
