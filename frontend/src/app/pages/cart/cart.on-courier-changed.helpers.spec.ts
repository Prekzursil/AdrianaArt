import { CartComponent } from './cart.component';

describe('CartComponent onCourierChanged (golden WU)', () => {
  it('persists courier + deliveryType prefs', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).courier = 'fan_courier';
    (cmp as any).deliveryType = 'locker';
    const saveDeliveryPrefs = jasmine.createSpy('saveDeliveryPrefs');
    (cmp as any).checkoutPrefs = { saveDeliveryPrefs };
    cmp.onCourierChanged();
    expect(saveDeliveryPrefs).toHaveBeenCalledWith({
      courier: 'fan_courier',
      deliveryType: 'locker',
    });
  });
});
