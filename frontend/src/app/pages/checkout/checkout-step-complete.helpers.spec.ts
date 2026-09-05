import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent step*Complete helpers (golden WU)', () => {
  function baseAddress() {
    return {
      name: 'Ada',
      email: 'ada@example.com',
      line1: 'Str. 1',
      city: 'Bucuresti',
      region: 'B',
      postal: '010101',
      country: 'RO',
    };
  }

  function createCmp(overrides: Record<string, unknown> = {}): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).auth = { isAuthenticated: () => false };
    (cmp as any).guestCreateAccount = false;
    (cmp as any).guestUsername = '';
    (cmp as any).guestPassword = '';
    (cmp as any).guestPasswordConfirm = '';
    (cmp as any).guestFirstName = '';
    (cmp as any).guestLastName = '';
    (cmp as any).guestDob = '';
    (cmp as any).guestEmailVerified = true;
    (cmp as any).address = baseAddress();
    (cmp as any).billing = {
      line1: '',
      city: '',
      region: '',
      postal: '',
      country: '',
    };
    (cmp as any).billingSameAsShipping = true;
    (cmp as any).shippingCountryInput = 'Romania';
    (cmp as any).billingCountryInput = '';
    (cmp as any).shippingCountryError = '';
    (cmp as any).billingCountryError = '';
    (cmp as any).shippingPhoneNational = '';
    (cmp as any).deliveryType = 'home';
    (cmp as any).locker = null;
    (cmp as any).guestPhoneE164 = () => '+40722111222';
    (cmp as any).shippingPhoneRequired = () => false;
    (cmp as any).shippingPhoneE164 = () => null;
    (cmp as any).effectivePhoneE164 = () => '+40722111222';
    (cmp as any).resolveCountryCode = (input: string) =>
      (input || '').toLowerCase().includes('rom') || (input || '').toUpperCase() === 'RO'
        ? 'RO'
        : null;
    (cmp as any).isValidEmail = (email: string) =>
      !!email && email.includes('@') && email.length <= 255;
    (cmp as any).emailVerified = () => true;
    Object.assign(cmp, overrides);
    return cmp;
  }

  it('step1Complete is true for auth users and guests not creating accounts', () => {
    expect(
      createCmp({
        auth: { isAuthenticated: () => true },
        guestCreateAccount: true,
      }).step1Complete(),
    ).toBeTrue();
    expect(createCmp({ guestCreateAccount: false }).step1Complete()).toBeTrue();

    const incomplete = createCmp({
      guestCreateAccount: true,
      guestUsername: 'ab',
      guestPassword: '123456',
      guestPasswordConfirm: '123456',
      guestFirstName: 'Ada',
      guestLastName: 'Lovelace',
      guestDob: '1990-01-01',
    });
    expect(incomplete.step1Complete()).toBeFalse();

    const complete = createCmp({
      guestCreateAccount: true,
      guestUsername: 'ada',
      guestPassword: '123456',
      guestPasswordConfirm: '123456',
      guestFirstName: 'Ada',
      guestLastName: 'Lovelace',
      guestDob: '1990-01-01',
    });
    expect(complete.step1Complete()).toBeTrue();
  });

  it('step2Complete validates address, RO region, locker, and email verification', () => {
    expect(createCmp().step2Complete()).toBeTrue();

    expect(createCmp({ address: { ...baseAddress(), name: '' } }).step2Complete()).toBeFalse();
    expect(
      createCmp({ address: { ...baseAddress(), email: 'not-an-email' } }).step2Complete(),
    ).toBeFalse();
    expect(createCmp({ address: { ...baseAddress(), region: '' } }).step2Complete()).toBeFalse();
    expect(createCmp({ deliveryType: 'locker', locker: null }).step2Complete()).toBeFalse();
    expect(createCmp({ deliveryType: 'locker', locker: { id: 'L1' } }).step2Complete()).toBeTrue();
    expect(createCmp({ guestEmailVerified: false }).step2Complete()).toBeFalse();
    expect(
      createCmp({
        auth: { isAuthenticated: () => true },
        emailVerified: () => false,
      }).step2Complete(),
    ).toBeFalse();
  });

  it('step3Complete delegates to step2Complete', () => {
    const cmp = createCmp();
    spyOn(cmp, 'step2Complete').and.returnValue(false);
    expect(cmp.step3Complete()).toBeFalse();
    (cmp.step2Complete as jasmine.Spy).and.returnValue(true);
    expect(cmp.step3Complete()).toBeTrue();
  });
});
