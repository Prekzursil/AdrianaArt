import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-toggle-guest-password -- toggleGuestPassword. */
describe('CheckoutComponent toggleGuestPassword (golden WU)', () => {
  it('flips guestShowPassword', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).guestShowPassword = false;
    cmp.toggleGuestPassword();
    expect((cmp as any).guestShowPassword).toBe(true);
    cmp.toggleGuestPassword();
    expect((cmp as any).guestShowPassword).toBe(false);
  });
});
