import { CheckoutPrefsService } from './checkout-prefs.service';

/** Golden WU checkout-prefs-save-payment-method — savePaymentMethod. */
describe('CheckoutPrefsService savePaymentMethod (golden WU)', () => {
  it('persists allowlisted methods and falls back to cod', () => {
    const store: Record<string, string> = {};
    (globalThis as any).localStorage = {
      setItem: (k: string, v: string) => {
        store[k] = v;
      },
    };
    const svc = new CheckoutPrefsService();
    svc.savePaymentMethod('stripe');
    expect(store['checkout_payment_method']).toBe('stripe');
    svc.savePaymentMethod('nope' as any);
    expect(store['checkout_payment_method']).toBe('cod');
  });
});
