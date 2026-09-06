import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-primary-email-resend-remaining — primaryEmailVerificationResendRemainingSeconds. */
describe('CheckoutComponent primaryEmailVerificationResendRemainingSeconds (golden WU)', () => {
  it('clamps remaining seconds to >= 0 from deadline', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    const realNow = Date.now;
    const now = 1_700_000_000_000;
    try {
      Date.now = () => now;
      (cmp as any).primaryEmailVerificationResendUntil = now + 4500;
      expect(cmp.primaryEmailVerificationResendRemainingSeconds()).toBe(5);
      (cmp as any).primaryEmailVerificationResendUntil = now - 1000;
      expect(cmp.primaryEmailVerificationResendRemainingSeconds()).toBe(0);
      (cmp as any).primaryEmailVerificationResendUntil = 0;
      expect(cmp.primaryEmailVerificationResendRemainingSeconds()).toBe(0);
    } finally {
      Date.now = realNow;
    }
  });
});
