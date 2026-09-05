import { CheckoutComponent } from './checkout.component';
import type { Address } from '../../core/account.service';
import type { CheckoutPaymentMethod } from '../../core/checkout-prefs.service';
import type { PhoneCountryOption } from '../../shared/phone';

/** Golden WU chk-fmt — N=3 formatSavedAddress / formatCountryOption / isPaymentMethodAvailable. */
describe('CheckoutComponent format / payment helpers (golden WU)', () => {
  function createCmp(): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).translate = { instant: (key: string) => `tr:${key}` };
    (cmp as any).currency = 'RON';
    (cmp as any).netopiaEnabled = true;
    (cmp as any).paypalEnabled = true;
    (cmp as any).stripeEnabled = true;
    (cmp as any).shippingCountryInput = 'Romania';
    (cmp as any).address = { country: 'RO' };
    (cmp as any).resolveCountryCode = (input: string) => {
      const v = (input || '').trim().toUpperCase();
      if (v === 'RO' || v.startsWith('ROM')) return 'RO';
      if (v === 'DE' || v.startsWith('GER')) return 'DE';
      return null;
    };
    return cmp;
  }

  function addr(overrides: Partial<Address> = {}): Address {
    return {
      id: 'a1',
      label: 'Home',
      line1: 'Str. Test 1',
      line2: null,
      city: 'București',
      region: 'B',
      postal_code: '010101',
      country: 'RO',
      phone: null,
      is_default_shipping: false,
      is_default_billing: false,
      ...overrides,
    } as Address;
  }

  it('formatSavedAddress joins label, line, place, and country with fallbacks', () => {
    const cmp = createCmp();
    expect(cmp.formatSavedAddress(addr())).toBe('Home — Str. Test 1 · București, B · RO');
    expect(
      cmp.formatSavedAddress(addr({ label: '  ', line1: '', city: '', region: '', country: '' })),
    ).toBe('tr:account.addresses.labels.address');
    expect(
      cmp.formatSavedAddress(
        addr({ label: '', line1: 'Line', city: 'Cluj', region: '', country: 'RO' }),
      ),
    ).toBe('tr:account.addresses.labels.address — Line · Cluj · RO');
  });

  it('formatCountryOption renders code — name', () => {
    const cmp = createCmp();
    const country = { code: 'RO', dial: '40', name: 'Romania', flag: '🇷🇴' } as PhoneCountryOption;
    expect(cmp.formatCountryOption(country)).toBe('RO — Romania');
  });

  it('isPaymentMethodAvailable gates COD/Netopia/PayPal/Stripe by currency and country', () => {
    const cmp = createCmp();
    const available = (method: CheckoutPaymentMethod) => cmp.isPaymentMethodAvailable(method);

    expect(available('cod')).toBe(true);
    expect(available('netopia')).toBe(true);
    expect(available('paypal')).toBe(true);
    expect(available('stripe')).toBe(true);

    (cmp as any).currency = 'EUR';
    expect(available('cod')).toBe(false);
    expect(available('netopia')).toBe(false);
    expect(available('paypal')).toBe(false);
    expect(available('stripe')).toBe(true);

    (cmp as any).currency = 'RON';
    (cmp as any).shippingCountryInput = 'Germany';
    (cmp as any).address = { country: 'DE' };
    expect(available('cod')).toBe(false);
    expect(available('netopia')).toBe(false);
    expect(available('paypal')).toBe(true);

    (cmp as any).shippingCountryInput = 'Romania';
    (cmp as any).address = { country: 'RO' };
    (cmp as any).netopiaEnabled = false;
    (cmp as any).paypalEnabled = false;
    (cmp as any).stripeEnabled = false;
    expect(available('netopia')).toBe(false);
    expect(available('paypal')).toBe(false);
    expect(available('stripe')).toBe(false);
    expect(available('cod')).toBe(true);
  });
});
