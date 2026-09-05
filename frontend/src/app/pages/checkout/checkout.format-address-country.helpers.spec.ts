import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-format-address-country — formatSavedAddress / formatCountryOption. */
describe('CheckoutComponent format address/country helpers (golden WU)', () => {
  function createCmp(): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).translate = {
      instant: jasmine.createSpy('instant').and.returnValue('Address'),
    };
    return cmp;
  }

  it('formatSavedAddress uses label or fallback and joins body parts', () => {
    const cmp = createCmp();
    expect(
      cmp.formatSavedAddress({
        label: 'Home',
        line1: 'Str 1',
        city: 'Cluj',
        region: 'CJ',
        country: 'RO',
      } as any),
    ).toBe('Home — Str 1 · Cluj, CJ · RO');

    expect(
      cmp.formatSavedAddress({
        label: '',
        line1: '',
        city: '',
        region: '',
        country: '',
      } as any),
    ).toBe('Address');
    expect((cmp as any).translate.instant).toHaveBeenCalledWith('account.addresses.labels.address');
  });

  it('formatSavedAddress omits empty city/region/country gracefully', () => {
    const cmp = createCmp();
    expect(
      cmp.formatSavedAddress({
        label: 'Work',
        line1: 'Bd 2',
        city: 'Bucuresti',
        region: '',
        country: 'RO',
      } as any),
    ).toBe('Work — Bd 2 · Bucuresti · RO');
  });

  it('formatCountryOption joins code and name', () => {
    const cmp = createCmp();
    expect(cmp.formatCountryOption({ code: 'RO', name: 'Romania' } as any)).toBe('RO — Romania');
  });
});
