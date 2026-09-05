import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-phone-email-gates — shippingPhoneRequired / emailVerified / copyShippingToBilling. */
describe('CheckoutComponent phone/email gate helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).deliveryType = 'home';
    (cmp as any).phoneRequiredLocker = true;
    (cmp as any).phoneRequiredHome = false;
    (cmp as any).billingSameAsShipping = false;
    (cmp as any).selectedBillingAddressId = 'x';
    (cmp as any).address = {
      line1: 'A1',
      line2: 'A2',
      city: 'C',
      region: 'R',
      postal: 'P',
      country: 'RO',
    };
    (cmp as any).billing = {
      line1: '',
      line2: '',
      city: '',
      region: '',
      postal: '',
      country: '',
    };
    (cmp as any).shippingCountryInput = 'Romania';
    (cmp as any).billingCountryInput = '';
    (cmp as any).billingCountryError = 'err';
    (cmp as any).auth = { user: () => ({ email_verified: true }) };
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('shippingPhoneRequired switches on deliveryType', () => {
    const home = createCmp({ deliveryType: 'home', phoneRequiredHome: false, phoneRequiredLocker: true });
    expect(home.shippingPhoneRequired()).toBe(false);
    const locker = createCmp({ deliveryType: 'locker', phoneRequiredHome: false, phoneRequiredLocker: true });
    expect(locker.shippingPhoneRequired()).toBe(true);
  });

  it('emailVerified mirrors auth.user email_verified', () => {
    expect(createCmp().emailVerified()).toBe(true);
    expect(createCmp({ auth: { user: () => ({ email_verified: false }) } }).emailVerified()).toBe(false);
    expect(createCmp({ auth: { user: () => null } }).emailVerified()).toBe(false);
  });

  it('copyShippingToBilling no-ops when same, else copies fields', () => {
    const same = createCmp({ billingSameAsShipping: true });
    same.copyShippingToBilling();
    expect((same as any).billing.line1).toBe('');

    const cmp = createCmp();
    cmp.copyShippingToBilling();
    expect((cmp as any).selectedBillingAddressId).toBe('');
    expect((cmp as any).billing).toEqual({
      line1: 'A1',
      line2: 'A2',
      city: 'C',
      region: 'R',
      postal: 'P',
      country: 'RO',
    });
    expect((cmp as any).billingCountryInput).toBe('Romania');
    expect((cmp as any).billingCountryError).toBe('');
  });
});
