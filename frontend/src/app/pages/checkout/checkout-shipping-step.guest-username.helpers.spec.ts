import { CheckoutShippingStepComponent } from './checkout-shipping-step.component';

/** Golden WU checkout-guest-username — guestUsername getter. */
describe('CheckoutShippingStepComponent guestUsername (golden WU)', () => {
  it('reads and writes via vm.guestUsername', () => {
    const cmp = Object.create(CheckoutShippingStepComponent.prototype) as any;
    const vm: any = { guestUsername: 'guest1' };
    Object.assign(cmp, { vm });
    expect(cmp.guestUsername).toBe('guest1');
    cmp.guestUsername = 'guest2';
    expect(vm.guestUsername).toBe('guest2');
  });
});
