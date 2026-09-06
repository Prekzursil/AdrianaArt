import { CheckoutPrefsService } from './checkout-prefs.service';

/** Golden WU checkout-prefs-save-payment — savePaymentMethod. */
describe('CheckoutPrefsService savePaymentMethod (golden WU)', () => {
  it('persists known methods and defaults unknown to cod', () => {
    const svc = Object.create(CheckoutPrefsService.prototype) as CheckoutPrefsService;
    const store: Record<string, string> = {};
    (globalThis as any).localStorage = {
      getItem: (k: string) => (k in store ? store[k] : null),
      setItem: (k: string, v: string) => {
        store[k] = String(v);
      },
    };
    svc.savePaymentMethod('paypal');
    expect(store['checkout_payment_method']).toBe('paypal');
    svc.savePaymentMethod('cash' as any);
    expect(store['checkout_payment_method']).toBe('cod');
  });
});
