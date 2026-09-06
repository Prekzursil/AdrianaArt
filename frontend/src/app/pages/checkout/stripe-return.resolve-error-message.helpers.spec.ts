import { StripeReturnComponent } from './stripe-return.component';

/** Golden WU stripe-return-resolve-error-message — resolveErrorMessage. */
describe('StripeReturnComponent resolveErrorMessage (golden WU)', () => {
  it('prefers detail, then non-http message, else translated fallback', () => {
    const cmp = Object.create(StripeReturnComponent.prototype) as StripeReturnComponent;
    Object.assign(cmp as any, {
      translate: { instant: (k: string) => `T:${k}` },
    });
    expect(
      (cmp as any).resolveErrorMessage(
        { error: { detail: '  boom  ' } },
        'checkout.stripeConfirmFailed',
      ),
    ).toBe('boom');
    expect(
      (cmp as any).resolveErrorMessage(
        { message: ' network glitch ' },
        'checkout.stripeConfirmFailed',
      ),
    ).toBe('network glitch');
    expect(
      (cmp as any).resolveErrorMessage(
        { message: 'Http failure response for url' },
        'checkout.stripeConfirmFailed',
      ),
    ).toBe('T:checkout.stripeConfirmFailed');
  });
});
