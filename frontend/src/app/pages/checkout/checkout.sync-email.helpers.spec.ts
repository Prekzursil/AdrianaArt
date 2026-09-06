import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-sync-email — cartSyncPending / emailVerified. */
describe('CheckoutComponent sync/email helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      syncing: false,
      syncQueued: false,
      auth: { user: () => ({ email_verified: true }) },
      ...overrides,
    });
    return cmp;
  }

  it('cartSyncPending is true when syncing or queued', () => {
    expect(createCmp().cartSyncPending()).toBe(false);
    expect(createCmp({ syncing: true }).cartSyncPending()).toBe(true);
    expect(createCmp({ syncQueued: true }).cartSyncPending()).toBe(true);
  });

  it('emailVerified mirrors auth.user email_verified', () => {
    expect(createCmp().emailVerified()).toBe(true);
    expect(createCmp({ auth: { user: () => ({ email_verified: false }) } }).emailVerified()).toBe(
      false,
    );
    expect(createCmp({ auth: { user: () => null } }).emailVerified()).toBe(false);
  });
});
