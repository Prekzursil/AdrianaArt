import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent step/address helpers (golden WU)', () => {
  function bareAddress() {
    return {
      name: 'Ada',
      email: 'ada@example.com',
      line1: '1 Main',
      line2: '',
      city: 'Bucharest',
      region: 'B',
      postal: '010101',
      country: 'RO',
    };
  }

  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      auth: { isAuthenticated: () => false },
      guestCreateAccount: false,
      guestUsername: '',
      guestPassword: '',
      guestPasswordConfirm: '',
      guestFirstName: '',
      guestLastName: '',
      guestDob: '',
      guestPhoneE164: () => null,
      address: bareAddress(),
      isValidEmail: () => true,
      shippingPhoneRequired: () => false,
      shippingPhoneNational: '',
      shippingPhoneE164: () => null,
      effectivePhoneE164: () => '+401',
      shippingCountryInput: 'Romania',
      resolveCountryCode: () => 'RO',
      shippingCountryError: '',
      deliveryType: 'home',
      locker: null,
      billingSameAsShipping: true,
      billing: bareAddress(),
      billingCountryInput: 'Romania',
      billingCountryError: '',
      emailVerified: () => true,
      guestEmailVerified: true,
      selectedBillingAddressId: 'b1',
      translate: { instant: (k: string) => k },
      ...overrides,
    });
    return cmp;
  }

  it('step1Complete true for guests without create-account', () => {
    expect(createCmp().step1Complete()).toBe(true);
    expect(createCmp({ auth: { isAuthenticated: () => true } }).step1Complete()).toBe(true);
  });

  it('step1Complete validates guest create-account fields', () => {
    const incomplete = createCmp({ guestCreateAccount: true, guestUsername: 'ab' });
    expect(incomplete.step1Complete()).toBe(false);
    const ok = createCmp({
      guestCreateAccount: true,
      guestUsername: 'ada_lovelace',
      guestPassword: 'secret1',
      guestPasswordConfirm: 'secret1',
      guestFirstName: 'Ada',
      guestLastName: 'Lovelace',
      guestDob: '1815-12-10',
      guestPhoneE164: () => '+40711',
    });
    expect(ok.step1Complete()).toBe(true);
  });

  it('step2Complete requires address email and RO region', () => {
    expect(createCmp().step2Complete()).toBe(true);
    const badEmail = createCmp({ address: { ...bareAddress(), email: '' } });
    expect(badEmail.step2Complete()).toBe(false);
    const noRegion = createCmp({ address: { ...bareAddress(), region: '' } });
    expect(noRegion.step2Complete()).toBe(false);
  });

  it('step3Complete mirrors step2; copyShippingToBilling copies when not same', () => {
    const cmp = createCmp({ billingSameAsShipping: false, billing: bareAddress() });
    expect(cmp.step3Complete()).toBe(cmp.step2Complete());
    (cmp as any).address.line1 = '99 Ship';
    (cmp as any).address.city = 'Cluj';
    cmp.copyShippingToBilling();
    expect((cmp as any).selectedBillingAddressId).toBe('');
    expect((cmp as any).billing.line1).toBe('99 Ship');
    expect((cmp as any).billing.city).toBe('Cluj');
  });

  it('formatSavedAddress joins label/line/place', () => {
    const cmp = createCmp();
    const label = cmp.formatSavedAddress({
      label: 'Home',
      line1: '1 Main',
      city: 'Bucharest',
      region: 'B',
      country: 'RO',
    } as any);
    expect(label).toContain('Home');
    expect(label).toContain('1 Main');
    expect(label).toContain('Bucharest');
  });
});
