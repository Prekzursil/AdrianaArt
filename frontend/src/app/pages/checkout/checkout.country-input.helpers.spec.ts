import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-country-input-helpers. */
describe('CheckoutComponent country/password helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      countries: [{ code: 'RO', name: 'Romania' }],
      formatCountryOption: (c: any) => `${c.code} — ${c.name}`,
      shippingCountryInput: '',
      resolveCountryCode: () => '',
      address: { country: 'ro' },
      guestShowPassword: false,
      ...overrides,
    });
    return cmp;
  }

  it('countryInputFromCode formats known codes', () => {
    const fn = (CheckoutComponent.prototype as any).countryInputFromCode.bind(bare());
    expect(fn('')).toBe('');
    expect(fn('ro')).toBe('RO — Romania');
    expect(fn('DE')).toBe('DE');
  });

  it('currentShippingCountryCode falls back to address then RO', () => {
    const fn = (CheckoutComponent.prototype as any).currentShippingCountryCode.bind(bare());
    expect(fn()).toBe('RO');
    const fn2 = (CheckoutComponent.prototype as any).currentShippingCountryCode.bind(
      bare({ resolveCountryCode: () => 'DE', address: { country: '' } }),
    );
    expect(fn2()).toBe('DE');
  });

  it('toggleGuestPassword flips visibility', () => {
    const cmp = bare();
    cmp.toggleGuestPassword();
    expect((cmp as any).guestShowPassword).toBe(true);
  });
});
