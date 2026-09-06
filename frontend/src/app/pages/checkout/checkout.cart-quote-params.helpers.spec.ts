import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-cart-quote-params — cartQuoteParams. */
describe('CheckoutComponent cartQuoteParams (golden WU)', () => {
  it('defaults country to RO and adds promo_code when present', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, { address: { country: '' } });
    expect((cmp as any).cartQuoteParams(null)).toEqual({ country: 'RO' });
    Object.assign(cmp as any, { address: { country: '  de  ' } });
    expect((cmp as any).cartQuoteParams('  SAVE  ')).toEqual({
      country: 'de',
      promo_code: 'SAVE',
    });
    expect((cmp as any).cartQuoteParams('   ')).toEqual({ country: 'de' });
  });
});
