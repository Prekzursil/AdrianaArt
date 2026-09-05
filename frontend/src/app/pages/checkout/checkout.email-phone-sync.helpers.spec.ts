import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent email/phone/sync helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      syncing: false,
      syncQueued: false,
      deliveryType: 'home',
      phoneRequiredHome: true,
      phoneRequiredLocker: false,
      auth: { user: () => ({ email_verified: true }) },
      ...overrides,
    });
    return cmp;
  }

  it('cartSyncPending mirrors syncing/syncQueued flags', () => {
    expect(createCmp().cartSyncPending()).toBe(false);
    expect(createCmp({ syncing: true }).cartSyncPending()).toBe(true);
    expect(createCmp({ syncQueued: true }).cartSyncPending()).toBe(true);
  });

  it('emailVerified reads auth.user email_verified', () => {
    expect(createCmp().emailVerified()).toBe(true);
    expect(createCmp({ auth: { user: () => ({ email_verified: false }) } }).emailVerified()).toBe(
      false,
    );
    expect(createCmp({ auth: { user: () => null } }).emailVerified()).toBe(false);
  });

  it('shippingPhoneRequired depends on deliveryType', () => {
    expect(createCmp({ deliveryType: 'home' }).shippingPhoneRequired()).toBe(true);
    expect(createCmp({ deliveryType: 'locker' }).shippingPhoneRequired()).toBe(false);
    expect(
      createCmp({ deliveryType: 'locker', phoneRequiredLocker: true }).shippingPhoneRequired(),
    ).toBe(true);
  });

  it('isValidEmail gates empty/long/malformed emails', () => {
    const cmp = createCmp();
    const valid = (cmp as any).isValidEmail.bind(cmp);
    expect(valid('')).toBe(false);
    expect(valid('a@b.c')).toBe(true);
    expect(valid('no-at')).toBe(false);
    expect(valid('a@' + 'x'.repeat(260))).toBe(false);
    expect(valid('a@nodot')).toBe(false);
  });
});
