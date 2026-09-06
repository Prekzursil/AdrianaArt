import { CheckoutPrefsService } from './checkout-prefs.service';

/** Golden WU checkout-prefs-try-load-delivery-prefs — tryLoadDeliveryPrefs. */
describe('CheckoutPrefsService tryLoadDeliveryPrefs (golden WU)', () => {
  it('parses stored prefs and returns null when missing/invalid', () => {
    const store: Record<string, string> = {
      checkout_delivery_prefs: JSON.stringify({
        courier: 'fan_courier',
        deliveryType: 'locker',
      }),
    };
    (globalThis as any).localStorage = {
      getItem: (k: string) => store[k] ?? null,
    };
    const svc = new CheckoutPrefsService();
    expect(svc.tryLoadDeliveryPrefs()).toEqual({
      courier: 'fan_courier',
      deliveryType: 'locker',
    });
    store['checkout_delivery_prefs'] = '{';
    expect(svc.tryLoadDeliveryPrefs()).toBeNull();
  });
});
