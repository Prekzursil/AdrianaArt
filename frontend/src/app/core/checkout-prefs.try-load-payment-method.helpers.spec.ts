import { CheckoutPrefsService } from './checkout-prefs.service';

/** Golden WU checkout-prefs-try-load-payment-method — tryLoadPaymentMethod. */
describe('CheckoutPrefsService tryLoadPaymentMethod (golden WU)', () => {
  it('returns allowlisted values and null otherwise', () => {
    const store: Record<string, string> = { checkout_payment_method: 'paypal' };
    (globalThis as any).localStorage = {
      getItem: (k: string) => store[k] ?? null,
    };
    const svc = new CheckoutPrefsService();
    expect(svc.tryLoadPaymentMethod()).toBe('paypal');
    store['checkout_payment_method'] = 'weird';
    expect(svc.tryLoadPaymentMethod()).toBeNull();
  });
});
