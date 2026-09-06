import { CheckoutShippingStepComponent } from './checkout-shipping-step.component';

/** Golden WU checkout-ro-counties — roCounties getter. */
describe('CheckoutShippingStepComponent roCounties (golden WU)', () => {
  it('delegates to vm.roCounties', () => {
    const cmp = Object.create(CheckoutShippingStepComponent.prototype) as any;
    Object.assign(cmp, { vm: { roCounties: ['Cluj', 'București'] } });
    expect(cmp.roCounties).toEqual(['Cluj', 'București']);
  });
});
