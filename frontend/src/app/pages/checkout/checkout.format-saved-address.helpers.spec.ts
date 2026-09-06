import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent formatSavedAddress (golden WU)', () => {
  function make() {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).translate = { instant: (k: string) => `T(${k})` };
    return cmp;
  }

  it('builds title — line · place · country; falls back to translated label', () => {
    const cmp = make();
    expect(
      cmp.formatSavedAddress({
        label: 'Home',
        line1: 'Str. 1',
        city: 'Cluj',
        region: 'CJ',
        country: 'RO',
      } as any),
    ).toBe('Home — Str. 1 · Cluj, CJ · RO');

    expect(
      cmp.formatSavedAddress({
        label: '  ',
        line1: '',
        city: '',
        region: '',
        country: '',
      } as any),
    ).toBe('T(account.addresses.labels.address)');
  });
});
