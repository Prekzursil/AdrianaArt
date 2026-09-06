import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent isPaymentMethodAvailable (golden WU)', () => {
  function createCmp(opts: {
    currency?: string;
    country?: string;
    netopiaEnabled?: boolean;
    paypalEnabled?: boolean;
    stripeEnabled?: boolean;
  }) {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).currency = opts.currency ?? 'RON';
    (cmp as any).netopiaEnabled = opts.netopiaEnabled ?? false;
    (cmp as any).paypalEnabled = opts.paypalEnabled ?? false;
    (cmp as any).stripeEnabled = opts.stripeEnabled ?? false;
    (cmp as any).currentShippingCountryCode = () => opts.country ?? 'RO';
    return cmp;
  }

  it('gates cod/netopia/paypal/stripe by currency, country, and flags', () => {
    expect(createCmp({}).isPaymentMethodAvailable('cod')).toBe(true);
    expect(createCmp({ currency: 'EUR' }).isPaymentMethodAvailable('cod')).toBe(false);
    expect(createCmp({ country: 'DE' }).isPaymentMethodAvailable('cod')).toBe(false);
    expect(createCmp({ netopiaEnabled: true }).isPaymentMethodAvailable('netopia')).toBe(true);
    expect(createCmp({ netopiaEnabled: false }).isPaymentMethodAvailable('netopia')).toBe(false);
    expect(createCmp({ paypalEnabled: true }).isPaymentMethodAvailable('paypal')).toBe(true);
    expect(createCmp({ paypalEnabled: true, currency: 'USD' }).isPaymentMethodAvailable('paypal')).toBe(false);
    expect(createCmp({ stripeEnabled: true, currency: 'EUR', country: 'DE' }).isPaymentMethodAvailable('stripe')).toBe(true);
    expect(createCmp({ stripeEnabled: false }).isPaymentMethodAvailable('stripe')).toBe(false);
    expect(createCmp({}).isPaymentMethodAvailable('other' as any)).toBe(true);
  });
});
