import { PayPalReturnComponent } from './paypal-return.component';

/** Golden WU paypal-return-resolve-error-message — resolveErrorMessage. */
describe('PayPalReturnComponent resolveErrorMessage (golden WU)', () => {
  it('prefers detail, then non-http message, else translated fallback', () => {
    const cmp = Object.create(PayPalReturnComponent.prototype) as PayPalReturnComponent;
    Object.assign(cmp as any, {
      translate: { instant: (k: string) => `T:${k}` },
    });
    expect(
      (cmp as any).resolveErrorMessage(
        { error: { detail: '  boom  ' } },
        'checkout.paypalConfirmFailed',
      ),
    ).toBe('boom');
    expect(
      (cmp as any).resolveErrorMessage(
        { message: ' network glitch ' },
        'checkout.paypalConfirmFailed',
      ),
    ).toBe('network glitch');
    expect(
      (cmp as any).resolveErrorMessage(
        { message: 'Http failure response for url' },
        'checkout.paypalConfirmFailed',
      ),
    ).toBe('T:checkout.paypalConfirmFailed');
  });
});
