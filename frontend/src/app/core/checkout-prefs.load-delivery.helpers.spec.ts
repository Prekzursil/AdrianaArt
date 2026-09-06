import { CheckoutPrefsService } from './checkout-prefs.service';

/** Golden WU checkout-prefs-load-delivery — loadDeliveryPrefs. */
describe('CheckoutPrefsService loadDeliveryPrefs (golden WU)', () => {
  it('falls back to sameday/home when nothing is stored', () => {
    const svc = Object.create(CheckoutPrefsService.prototype) as CheckoutPrefsService;
    Object.assign(svc as any, { tryLoadDeliveryPrefs: () => null });
    expect(svc.loadDeliveryPrefs()).toEqual({ courier: 'sameday', deliveryType: 'home' });
    Object.assign(svc as any, {
      tryLoadDeliveryPrefs: () => ({ courier: 'fan_courier', deliveryType: 'locker' }),
    });
    expect(svc.loadDeliveryPrefs()).toEqual({
      courier: 'fan_courier',
      deliveryType: 'locker',
    });
  });
});
