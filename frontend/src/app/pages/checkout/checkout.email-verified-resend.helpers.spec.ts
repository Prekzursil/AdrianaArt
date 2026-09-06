import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent emailVerified / resend remaining (golden WU)', () => {
  it('emailVerified reads auth.user().email_verified', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).auth = { user: () => ({ email_verified: true }) };
    expect(cmp.emailVerified()).toBe(true);
    (cmp as any).auth = { user: () => ({ email_verified: false }) };
    expect(cmp.emailVerified()).toBe(false);
    (cmp as any).auth = { user: () => null };
    expect(cmp.emailVerified()).toBe(false);
  });

  it('primaryEmailVerificationResendRemainingSeconds clamps to ceil seconds', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).primaryEmailVerificationResendUntil = null;
    expect(cmp.primaryEmailVerificationResendRemainingSeconds()).toBe(0);
    (cmp as any).primaryEmailVerificationResendUntil = Date.now() + 2500;
    const left = cmp.primaryEmailVerificationResendRemainingSeconds();
    expect(left).toBeGreaterThanOrEqual(2);
    expect(left).toBeLessThanOrEqual(3);
    (cmp as any).primaryEmailVerificationResendUntil = Date.now() - 1000;
    expect(cmp.primaryEmailVerificationResendRemainingSeconds()).toBe(0);
  });
});
