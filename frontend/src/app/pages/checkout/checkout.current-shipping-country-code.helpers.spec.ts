import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-current-shipping-country-code — currentShippingCountryCode. */
describe('CheckoutComponent currentShippingCountryCode (golden WU)', () => {
  it('prefers resolved input, then address country, else RO', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      shippingCountryInput: 'de',
      address: { country: 'fr' },
      resolveCountryCode: (v: string) => (v === 'de' ? 'DE' : ''),
    });
    expect((cmp as any).currentShippingCountryCode()).toBe('DE');
    Object.assign(cmp as any, {
      resolveCountryCode: () => '',
      address: { country: '  it ' },
    });
    expect((cmp as any).currentShippingCountryCode()).toBe('IT');
    Object.assign(cmp as any, { address: { country: '' } });
    expect((cmp as any).currentShippingCountryCode()).toBe('RO');
  });
});
