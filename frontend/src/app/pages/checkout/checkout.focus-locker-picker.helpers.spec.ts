import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-focus-locker-picker -- focusLockerPicker. */
describe('CheckoutComponent focusLockerPicker (golden WU)', () => {
  it('delegates to focusElementById for the locker picker', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      focusElementById: jasmine.createSpy('focusElementById'),
    });
    (cmp as any).focusLockerPicker();
    expect((cmp as any).focusElementById).toHaveBeenCalledWith('checkout-locker-picker');
  });
});
