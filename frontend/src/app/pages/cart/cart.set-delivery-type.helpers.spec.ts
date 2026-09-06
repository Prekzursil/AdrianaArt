import { CartComponent } from './cart.component';

describe('CartComponent setDeliveryType (golden WU)', () => {
  it('updates deliveryType and persists prefs', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).courier = 'sameday';
    (cmp as any).deliveryType = 'home';
    const saveDeliveryPrefs = jasmine.createSpy('saveDeliveryPrefs');
    (cmp as any).checkoutPrefs = { saveDeliveryPrefs };
    cmp.setDeliveryType('locker' as any);
    expect((cmp as any).deliveryType).toBe('locker');
    expect(saveDeliveryPrefs).toHaveBeenCalledWith({
      courier: 'sameday',
      deliveryType: 'locker',
    });
  });
});
