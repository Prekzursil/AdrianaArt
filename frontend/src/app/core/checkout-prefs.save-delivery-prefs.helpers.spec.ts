import { CheckoutPrefsService } from './checkout-prefs.service';

/** Golden WU checkout-prefs-save-delivery-prefs — saveDeliveryPrefs. */
describe('CheckoutPrefsService saveDeliveryPrefs (golden WU)', () => {
  it('normalizes courier/deliveryType and JSON-persists', () => {
    const store: Record<string, string> = {};
    (globalThis as any).localStorage = {
      setItem: (k: string, v: string) => {
        store[k] = v;
      },
    };
    const svc = new CheckoutPrefsService();
    svc.saveDeliveryPrefs({ courier: 'fan_courier', deliveryType: 'locker' });
    expect(JSON.parse(store['checkout_delivery_prefs'])).toEqual({
      courier: 'fan_courier',
      deliveryType: 'locker',
    });
    svc.saveDeliveryPrefs({ courier: 'other' as any, deliveryType: 'home' });
    expect(JSON.parse(store['checkout_delivery_prefs'])).toEqual({
      courier: 'sameday',
      deliveryType: 'home',
    });
  });
});
