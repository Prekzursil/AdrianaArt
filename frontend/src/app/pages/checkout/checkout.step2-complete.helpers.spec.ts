import { CheckoutComponent } from './checkout.component';

/** Golden WU — step2Complete address / phone / billing / email-verify gates. */
describe('CheckoutComponent step2Complete (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      address: {
        name: 'Ada',
        email: 'ada@example.com',
        line1: 'Str 1',
        city: 'Bucharest',
        postal: '010101',
        region: 'B',
      },
      billing: {
        line1: 'Bill 1',
        city: 'Cluj',
        postal: '400000',
        region: 'CJ',
      },
      shippingPhoneRequired: () => false,
      shippingPhoneNational: '',
      shippingPhoneE164: () => null as string | null,
      effectivePhoneE164: () => null as string | null,
      isValidEmail: (e: string) => e.includes('@'),
      resolveCountryCode: (v: string) => (v ? 'RO' : null),
      shippingCountryInput: 'Romania',
      billingCountryInput: 'Romania',
      shippingCountryError: '',
      billingCountryError: '',
      deliveryType: 'courier',
      locker: null,
      billingSameAsShipping: true,
      auth: { isAuthenticated: () => false },
      guestEmailVerified: true,
      emailVerified: () => true,
      ...overrides,
    });
    return cmp;
  }

  it('rejects missing name/email/address and invalid email', () => {
    expect(bare({ address: { name: ' ', email: 'a@b.c', line1: 'x', city: 'y', postal: 'z', region: 'B' } }).step2Complete()).toBe(false);
    expect(
      bare({
        address: { name: 'Ada', email: '', line1: 'x', city: 'y', postal: 'z', region: 'B' },
      }).step2Complete(),
    ).toBe(false);
    expect(
      bare({
        isValidEmail: () => false,
      }).step2Complete(),
    ).toBe(false);
  });

  it('enforces shipping phone when required', () => {
    expect(
      bare({
        shippingPhoneRequired: () => true,
        shippingPhoneNational: '0722',
        shippingPhoneE164: () => null,
        effectivePhoneE164: () => '+40722',
      }).step2Complete(),
    ).toBe(false);
    expect(
      bare({
        shippingPhoneRequired: () => true,
        shippingPhoneNational: '',
        shippingPhoneE164: () => null,
        effectivePhoneE164: () => null,
      }).step2Complete(),
    ).toBe(false);
    expect(
      bare({
        shippingPhoneRequired: () => true,
        shippingPhoneNational: '',
        effectivePhoneE164: () => '+40722111222',
      }).step2Complete(),
    ).toBe(true);
  });

  it('requires RO region, locker when deliveryType=locker, and billing fields', () => {
    expect(
      bare({
        address: { name: 'Ada', email: 'a@b.c', line1: 'x', city: 'y', postal: 'z', region: '' },
        resolveCountryCode: () => 'RO',
      }).step2Complete(),
    ).toBe(false);
    expect(bare({ deliveryType: 'locker', locker: null }).step2Complete()).toBe(false);
    expect(bare({ deliveryType: 'locker', locker: { id: 'L1' } }).step2Complete()).toBe(true);

    expect(
      bare({
        billingSameAsShipping: false,
        billing: { line1: '', city: 'c', postal: 'p', region: 'CJ' },
      }).step2Complete(),
    ).toBe(false);
    expect(
      bare({
        billingSameAsShipping: false,
        billing: { line1: 'b', city: 'c', postal: 'p', region: 'CJ' },
      }).step2Complete(),
    ).toBe(true);
  });

  it('requires emailVerified for auth users and guestEmailVerified for guests', () => {
    expect(
      bare({
        auth: { isAuthenticated: () => true },
        emailVerified: () => false,
      }).step2Complete(),
    ).toBe(false);
    expect(
      bare({
        auth: { isAuthenticated: () => true },
        emailVerified: () => true,
      }).step2Complete(),
    ).toBe(true);
    expect(bare({ guestEmailVerified: false }).step2Complete()).toBe(false);
  });
});
