import { CheckoutPrefsService } from './checkout-prefs.service';

/** Golden WU checkout-prefs-try-load-delivery — tryLoadDeliveryPrefs. */
describe('CheckoutPrefsService tryLoadDeliveryPrefs (golden WU)', () => {
  it('parses stored prefs and normalizes courier/deliveryType', () => {
    const svc = Object.create(CheckoutPrefsService.prototype) as CheckoutPrefsService;
    const store: Record<string, string> = {};
    (globalThis as any).localStorage = {
      getItem: (k: string) => (k in store ? store[k] : null),
      setItem: (k: string, v: string) => {
        store[k] = String(v);
      },
    };
    expect(svc.tryLoadDeliveryPrefs()).toBeNull();
    store['checkout_delivery_prefs'] = JSON.stringify({
      courier: 'fan_courier',
      deliveryType: 'locker',
    });
    expect(svc.tryLoadDeliveryPrefs()).toEqual({
      courier: 'fan_courier',
      deliveryType: 'locker',
    });
    store['checkout_delivery_prefs'] = JSON.stringify({ courier: 'nope', deliveryType: 'x' });
    expect(svc.tryLoadDeliveryPrefs()).toEqual({
      courier: 'sameday',
      deliveryType: 'home',
    });
    store['checkout_delivery_prefs'] = '{bad';
    expect(svc.tryLoadDeliveryPrefs()).toBeNull();
  });
});
