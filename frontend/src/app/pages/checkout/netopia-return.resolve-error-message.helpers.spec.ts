import { NetopiaReturnComponent } from './netopia-return.component';

/** Golden WU netopia-return-resolve-error-message — resolveErrorMessage. */
describe('NetopiaReturnComponent resolveErrorMessage (golden WU)', () => {
  it('prefers detail, then non-http message, else translated fallback', () => {
    const cmp = Object.create(NetopiaReturnComponent.prototype) as NetopiaReturnComponent;
    Object.assign(cmp as any, {
      translate: { instant: (k: string) => `T:${k}` },
    });
    expect(
      (cmp as any).resolveErrorMessage(
        { error: { detail: '  boom  ' } },
        'checkout.netopiaConfirmFailed',
      ),
    ).toBe('boom');
    expect(
      (cmp as any).resolveErrorMessage(
        { message: ' network glitch ' },
        'checkout.netopiaConfirmFailed',
      ),
    ).toBe('network glitch');
    expect(
      (cmp as any).resolveErrorMessage(
        { message: 'Http failure response for url' },
        'checkout.netopiaConfirmFailed',
      ),
    ).toBe('T:checkout.netopiaConfirmFailed');
  });
});
