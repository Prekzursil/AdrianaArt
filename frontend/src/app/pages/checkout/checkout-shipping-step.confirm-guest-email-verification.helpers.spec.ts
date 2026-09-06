import { CheckoutShippingStepComponent } from './checkout-shipping-step.component';

/** Golden WU checkout-shipping-step-confirm-guest-email-verification. */
describe('CheckoutShippingStepComponent confirmGuestEmailVerification (golden WU)', () => {
  it('delegates to the checkout view-model', () => {
    const cmp = Object.create(
      CheckoutShippingStepComponent.prototype,
    ) as CheckoutShippingStepComponent;
    Object.assign(cmp as any, {
      vm: { confirmGuestEmailVerification: jasmine.createSpy('confirm') },
    });
    cmp.confirmGuestEmailVerification();
    expect((cmp as any).vm.confirmGuestEmailVerification).toHaveBeenCalled();
  });
});
