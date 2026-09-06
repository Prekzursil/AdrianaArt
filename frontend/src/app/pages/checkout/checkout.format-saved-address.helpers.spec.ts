import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-format-saved-address-helpers. */
describe('CheckoutComponent format helpers (golden WU)', () => {
  function bare(): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      translate: { instant: (k: string) => k },
    });
    return cmp;
  }

  it('formatSavedAddress builds title and body', () => {
    const cmp = bare();
    expect(
      cmp.formatSavedAddress({
        label: 'Home',
        line1: 'Str 1',
        city: 'Buc',
        region: 'B',
        country: 'RO',
      } as any),
    ).toBe('Home — Str 1 · Buc, B · RO');
    expect(cmp.formatSavedAddress({ label: '', line1: '', city: '', region: '', country: '' } as any)).toBe(
      'account.addresses.labels.address',
    );
  });

  it('formatCountryOption and isElementVisible', () => {
    const cmp = bare();
    expect(cmp.formatCountryOption({ code: 'RO', name: 'Romania' } as any)).toBe('RO — Romania');
    const vis = (CheckoutComponent.prototype as any).isElementVisible.bind(cmp);
    expect(vis({ getClientRects: () => [{}] })).toBe(true);
    expect(vis({ getClientRects: () => [] })).toBe(false);
  });
});
