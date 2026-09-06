import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-normalize-payment-redirect-url -- normalizePaymentRedirectUrl. */
describe('CheckoutComponent normalizePaymentRedirectUrl (golden WU)', () => {
  it('allows same-origin mock paths and https allowlisted hosts only', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    const origin = globalThis.location?.origin || 'https://example.test';
    const mock = (cmp as any).normalizePaymentRedirectUrl(
      `${origin}/checkout/mock/pay`,
      ['payments.example'],
    );
    expect(mock).toContain('/checkout/mock/pay');

    expect(
      (cmp as any).normalizePaymentRedirectUrl('https://evil.example/x', ['payments.example']),
    ).toBeNull();
    expect(
      (cmp as any).normalizePaymentRedirectUrl('https://pay.payments.example/ok', [
        'payments.example',
      ]),
    ).toContain('pay.payments.example');
    expect((cmp as any).normalizePaymentRedirectUrl('not a url', [])).toBeNull();
  });
});
