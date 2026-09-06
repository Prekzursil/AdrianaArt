import { CheckoutPrefsService } from './checkout-prefs.service';

/** Golden WU checkout-prefs-save-delivery — saveDeliveryPrefs. */
describe('CheckoutPrefsService saveDeliveryPrefs (golden WU)', () => {
  it('normalizes and persists courier/deliveryType', () => {
    const svc = Object.create(CheckoutPrefsService.prototype) as CheckoutPrefsService;
    const store: Record<string, string> = {};
    (globalThis as any).localStorage = {
      getItem: (k: string) => (k in store ? store[k] : null),
      setItem: (k: string, v: string) => {
        store[k] = String(v);
      },
    };
    svc.saveDeliveryPrefs({ courier: 'fan_courier', deliveryType: 'locker' } as any);
    expect(JSON.parse(store['checkout_delivery_prefs'])).toEqual({
      courier: 'fan_courier',
      deliveryType: 'locker',
    });
    svc.saveDeliveryPrefs({ courier: 'weird', deliveryType: 'weird' } as any);
    expect(JSON.parse(store['checkout_delivery_prefs'])).toEqual({
      courier: 'sameday',
      deliveryType: 'home',
    });
  });
});
