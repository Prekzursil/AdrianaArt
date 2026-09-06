import { CheckoutPrefsService } from './checkout-prefs.service';

/** Golden WU checkout-prefs-load-delivery-prefs — loadDeliveryPrefs. */
describe('CheckoutPrefsService loadDeliveryPrefs (golden WU)', () => {
  it('returns tryLoad result when present; otherwise sameday/home default', () => {
    const svc = Object.create(CheckoutPrefsService.prototype) as CheckoutPrefsService;
    Object.assign(svc as any, {
      tryLoadDeliveryPrefs: () => ({ courier: 'fan_courier', deliveryType: 'locker' }),
    });
    expect(svc.loadDeliveryPrefs()).toEqual({
      courier: 'fan_courier',
      deliveryType: 'locker',
    });
    Object.assign(svc as any, { tryLoadDeliveryPrefs: () => null });
    expect(svc.loadDeliveryPrefs()).toEqual({ courier: 'sameday', deliveryType: 'home' });
  });
});
