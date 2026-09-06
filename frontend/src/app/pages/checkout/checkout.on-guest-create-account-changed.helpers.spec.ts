import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-on-guest-create-account-changed — onGuestCreateAccountChanged. */
describe('CheckoutComponent onGuestCreateAccountChanged (golden WU)', () => {
  it('forces saveAddress true when enabled; no-op when disabled', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).saveAddress = false;
    cmp.onGuestCreateAccountChanged(false);
    expect((cmp as any).saveAddress).toBe(false);
    cmp.onGuestCreateAccountChanged(true);
    expect((cmp as any).saveAddress).toBe(true);
  });
});
