import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-clear-guest-resend-cooldown -- clearGuestResendCooldown. */
describe('CheckoutComponent clearGuestResendCooldown (golden WU)', () => {
  it('clears cooldown counters and interval handle', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    const handle = setInterval(() => undefined, 60_000);
    Object.assign(cmp as any, {
      guestResendCooldownUntil: Date.now() + 10_000,
      guestResendSecondsLeft: 9,
      guestResendTimer: handle,
    });

    (cmp as any).clearGuestResendCooldown();
    expect((cmp as any).guestResendCooldownUntil).toBe(0);
    expect((cmp as any).guestResendSecondsLeft).toBe(0);
    expect((cmp as any).guestResendTimer).toBeNull();
  });
});
