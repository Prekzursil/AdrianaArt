import { CheckoutShippingStepComponent } from './checkout-shipping-step.component';

/** Golden WU checkout-shipping-step-apply-selected-shipping-address. */
describe('CheckoutShippingStepComponent applySelectedShippingAddress (golden WU)', () => {
  it('delegates to the checkout view-model', () => {
    const cmp = Object.create(
      CheckoutShippingStepComponent.prototype,
    ) as CheckoutShippingStepComponent;
    Object.assign(cmp as any, {
      vm: { applySelectedShippingAddress: jasmine.createSpy('apply') },
    });
    cmp.applySelectedShippingAddress();
    expect((cmp as any).vm.applySelectedShippingAddress).toHaveBeenCalled();
  });
});
