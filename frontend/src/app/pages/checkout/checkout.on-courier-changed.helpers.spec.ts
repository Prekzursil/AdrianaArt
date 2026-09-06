import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-on-courier-changed -- onCourierChanged. */
describe('CheckoutComponent onCourierChanged (golden WU)', () => {
  it('clears locker on locker delivery and persists prefs', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      deliveryError: 'x',
      deliveryType: 'locker',
      locker: { id: 'L1' },
      courier: 'sameday',
      checkoutPrefs: { saveDeliveryPrefs: jasmine.createSpy('saveDeliveryPrefs') },
    });
    cmp.onCourierChanged();
    expect((cmp as any).deliveryError).toBe('');
    expect((cmp as any).locker).toBeNull();
    expect((cmp as any).checkoutPrefs.saveDeliveryPrefs).toHaveBeenCalledWith({
      courier: 'sameday',
      deliveryType: 'locker',
    });
  });
});
