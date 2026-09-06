import { CheckoutPrefsService } from './checkout-prefs.service';

/** Golden WU checkout-prefs-try-load-payment — tryLoadPaymentMethod. */
describe('CheckoutPrefsService tryLoadPaymentMethod (golden WU)', () => {
  it('accepts known payment methods and rejects others', () => {
    const svc = Object.create(CheckoutPrefsService.prototype) as CheckoutPrefsService;
    const store: Record<string, string> = {};
    (globalThis as any).localStorage = {
      getItem: (k: string) => (k in store ? store[k] : null),
      setItem: (k: string, v: string) => {
        store[k] = String(v);
      },
    };
    expect(svc.tryLoadPaymentMethod()).toBeNull();
    store['checkout_payment_method'] = 'stripe';
    expect(svc.tryLoadPaymentMethod()).toBe('stripe');
    store['checkout_payment_method'] = 'bitcoin';
    expect(svc.tryLoadPaymentMethod()).toBeNull();
  });
});
