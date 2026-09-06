import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent shippingPhoneRequired (golden WU)', () => {
  function createCmp(deliveryType: 'home' | 'locker', home: boolean, locker: boolean) {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).deliveryType = deliveryType;
    (cmp as any).phoneRequiredHome = home;
    (cmp as any).phoneRequiredLocker = locker;
    return cmp;
  }

  it('picks locker vs home phone requirement from delivery type', () => {
    expect(createCmp('locker', false, true).shippingPhoneRequired()).toBe(true);
    expect(createCmp('locker', true, false).shippingPhoneRequired()).toBe(false);
    expect(createCmp('home', true, false).shippingPhoneRequired()).toBe(true);
    expect(createCmp('home', false, true).shippingPhoneRequired()).toBe(false);
  });
});
