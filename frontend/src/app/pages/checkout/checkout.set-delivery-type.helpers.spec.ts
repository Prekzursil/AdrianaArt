import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-set-delivery-type -- setDeliveryType. */
describe('CheckoutComponent setDeliveryType (golden WU)', () => {
  function createCmp() {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      deliveryLockerAllowed: true,
      deliveryType: 'locker',
      deliveryError: 'x',
      locker: { id: 'L1' },
      courier: 'sameday',
      translate: { instant: (k: string) => k },
      checkoutPrefs: { saveDeliveryPrefs: jasmine.createSpy('saveDeliveryPrefs') },
    });
    return cmp;
  }

  it('blocks locker when unavailable and clears locker on home', () => {
    const blocked = createCmp();
    (blocked as any).deliveryLockerAllowed = false;
    blocked.setDeliveryType('locker');
    expect((blocked as any).deliveryError).toBe('checkout.deliveryLockerUnavailable');
    expect((blocked as any).deliveryType).toBe('locker');

    const home = createCmp();
    home.setDeliveryType('home');
    expect((home as any).deliveryType).toBe('home');
    expect((home as any).locker).toBeNull();
    expect((home as any).deliveryError).toBe('');
    expect((home as any).checkoutPrefs.saveDeliveryPrefs).toHaveBeenCalled();
  });
});
