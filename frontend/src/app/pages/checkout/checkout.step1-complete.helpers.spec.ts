import { CheckoutComponent } from './checkout.component';

/** Golden WU — step1Complete guest/auth gates. */
describe('CheckoutComponent step1Complete (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): CheckoutComponent {
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
      guestPhoneE164: () => null as string | null,
      ...overrides,
    });
    return cmp;
  }

  it('returns true for authenticated or guest without account creation', () => {
    expect(bare({ auth: { isAuthenticated: () => true } }).step1Complete()).toBe(true);
    expect(bare({ guestCreateAccount: false }).step1Complete()).toBe(true);
  });

  it('validates guest account fields when creating account', () => {
    expect(bare({ guestCreateAccount: true, guestUsername: 'ab' }).step1Complete()).toBe(false);

    expect(
      bare({
        guestCreateAccount: true,
        guestUsername: 'user_1',
        guestPassword: 'secret1',
        guestPasswordConfirm: 'secret1',
        guestFirstName: 'A',
        guestLastName: 'B',
        guestDob: '2000-01-01',
        guestPhoneE164: () => '+40722111222',
      }).step1Complete(),
    ).toBe(true);

    expect(
      bare({
        guestCreateAccount: true,
        guestUsername: 'user_1',
        guestPassword: 'secret1',
        guestPasswordConfirm: 'nope',
        guestFirstName: 'A',
        guestLastName: 'B',
        guestDob: '2000-01-01',
        guestPhoneE164: () => '+40722111222',
      }).step1Complete(),
    ).toBe(false);
  });
});
