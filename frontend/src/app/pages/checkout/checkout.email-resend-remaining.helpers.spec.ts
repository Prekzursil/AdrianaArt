import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-email-resend-remaining — resend countdown. */
describe('CheckoutComponent primaryEmailVerificationResendRemainingSeconds (golden WU)', () => {
  function createCmp(until: number | null) {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).primaryEmailVerificationResendUntil = until;
    return cmp;
  }

  it('returns 0 without deadline; else ceil remaining seconds', () => {
    expect(createCmp(null).primaryEmailVerificationResendRemainingSeconds()).toBe(0);
    const past = Date.now() - 5_000;
    expect(createCmp(past).primaryEmailVerificationResendRemainingSeconds()).toBe(0);
    const future = Date.now() + 2_500;
    const remaining = createCmp(future).primaryEmailVerificationResendRemainingSeconds();
    expect(remaining).toBeGreaterThanOrEqual(2);
    expect(remaining).toBeLessThanOrEqual(3);
  });
});
