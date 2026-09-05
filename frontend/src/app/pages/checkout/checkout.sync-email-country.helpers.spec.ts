import { CheckoutComponent } from './checkout.component';
import type { PhoneCountryOption } from '../../shared/phone';

/** Golden WU checkout-sync-email-country — N=3 cartSyncPending / emailVerified / formatCountryOption. */
describe('CheckoutComponent sync/email/country helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).syncing = false;
    (cmp as any).syncQueued = false;
    (cmp as any).auth = { user: () => null };
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('cartSyncPending is true when syncing or syncQueued', () => {
    expect(createCmp({ syncing: false, syncQueued: false }).cartSyncPending()).toBe(false);
    expect(createCmp({ syncing: true, syncQueued: false }).cartSyncPending()).toBe(true);
    expect(createCmp({ syncing: false, syncQueued: true }).cartSyncPending()).toBe(true);
    expect(createCmp({ syncing: true, syncQueued: true }).cartSyncPending()).toBe(true);
  });

  it('emailVerified mirrors auth.user().email_verified', () => {
    expect(createCmp({ auth: { user: () => null } }).emailVerified()).toBe(false);
    expect(createCmp({ auth: { user: () => ({ email_verified: false }) } }).emailVerified()).toBe(
      false,
    );
    expect(createCmp({ auth: { user: () => ({ email_verified: true }) } }).emailVerified()).toBe(
      true,
    );
  });

  it('formatCountryOption renders code — name', () => {
    const cmp = createCmp();
    const country = { code: 'RO', name: 'Romania' } as PhoneCountryOption;
    expect(cmp.formatCountryOption(country)).toBe('RO — Romania');
  });
});
