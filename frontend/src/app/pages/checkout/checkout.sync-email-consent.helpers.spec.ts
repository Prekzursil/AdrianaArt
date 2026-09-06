import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent cartSyncPending / emailVerified / consentBlocking (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      syncing: false,
      syncQueued: false,
      acceptTerms: true,
      acceptPrivacy: true,
      legalConsentsLoading: false,
      auth: {
        isAuthenticated: () => false,
        user: () => null,
      },
      ...overrides,
    });
    return cmp;
  }

  it('cartSyncPending is syncing OR syncQueued', () => {
    expect(bare().cartSyncPending()).toBe(false);
    expect(bare({ syncing: true }).cartSyncPending()).toBe(true);
    expect(bare({ syncQueued: true }).cartSyncPending()).toBe(true);
  });

  it('emailVerified reads auth.user email_verified', () => {
    expect(bare().emailVerified()).toBe(false);
    expect(
      bare({
        auth: { isAuthenticated: () => true, user: () => ({ email_verified: true }) },
      }).emailVerified(),
    ).toBe(true);
    expect(
      bare({
        auth: { isAuthenticated: () => true, user: () => ({ email_verified: false }) },
      }).emailVerified(),
    ).toBe(false);
  });

  it('consentBlocking waits on legal consents then requires both accepts', () => {
    expect(
      bare({
        auth: { isAuthenticated: () => true, user: () => null },
        legalConsentsLoading: true,
      }).consentBlocking(),
    ).toBe(true);
    expect(bare({ acceptTerms: false }).consentBlocking()).toBe(true);
    expect(bare({ acceptPrivacy: false }).consentBlocking()).toBe(true);
    expect(bare().consentBlocking()).toBe(false);
  });
});
