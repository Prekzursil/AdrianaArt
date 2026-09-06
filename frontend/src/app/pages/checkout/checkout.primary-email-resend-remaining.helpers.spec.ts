import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-primary-email-resend-remaining — primaryEmailVerificationResendRemainingSeconds. */
describe('CheckoutComponent primaryEmailVerificationResendRemainingSeconds (golden WU)', () => {
  it('clamps remaining seconds to >= 0 from deadline', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    const now = Date.now();
    (cmp as any).primaryEmailVerificationResendAvailableAt = now + 4500;
    spyOn(Date, 'now').and.returnValue(now);
    expect(cmp.primaryEmailVerificationResendRemainingSeconds()).toBe(5);
    (cmp as any).primaryEmailVerificationResendAvailableAt = now - 1000;
    expect(cmp.primaryEmailVerificationResendRemainingSeconds()).toBe(0);
  });
});
