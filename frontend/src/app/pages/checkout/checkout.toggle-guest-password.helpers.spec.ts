import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-toggle-guest-password — password visibility toggles. */
describe('CheckoutComponent guest password toggle helpers (golden WU)', () => {
  function createCmp(): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).guestShowPassword = false;
    (cmp as any).guestShowPasswordConfirm = false;
    return cmp;
  }

  it('toggleGuestPassword flips visibility', () => {
    const cmp = createCmp();
    cmp.toggleGuestPassword();
    expect((cmp as any).guestShowPassword).toBe(true);
    cmp.toggleGuestPassword();
    expect((cmp as any).guestShowPassword).toBe(false);
  });

  it('toggleGuestPasswordConfirm flips confirm visibility', () => {
    const cmp = createCmp();
    cmp.toggleGuestPasswordConfirm();
    expect((cmp as any).guestShowPasswordConfirm).toBe(true);
  });

  it('toggles are independent', () => {
    const cmp = createCmp();
    cmp.toggleGuestPassword();
    expect((cmp as any).guestShowPasswordConfirm).toBe(false);
    cmp.toggleGuestPasswordConfirm();
    expect((cmp as any).guestShowPassword).toBe(true);
    expect((cmp as any).guestShowPasswordConfirm).toBe(true);
  });
});
