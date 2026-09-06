import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-toggle-guest-password-confirm — toggleGuestPasswordConfirm. */
describe('CheckoutComponent toggleGuestPasswordConfirm (golden WU)', () => {
  it('flips guestShowPasswordConfirm', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).guestShowPasswordConfirm = false;
    cmp.toggleGuestPasswordConfirm();
    expect((cmp as any).guestShowPasswordConfirm).toBe(true);
    cmp.toggleGuestPasswordConfirm();
    expect((cmp as any).guestShowPasswordConfirm).toBe(false);
  });
});
