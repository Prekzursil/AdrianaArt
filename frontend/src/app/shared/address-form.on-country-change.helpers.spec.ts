import { AddressFormComponent } from './address-form.component';

/** Golden WU address-form-on-country-change — onCountryChange. */
describe('AddressFormComponent onCountryChange (golden WU)', () => {
  it('clears results and optionally re-queries autocomplete', () => {
    const cmp = Object.create(AddressFormComponent.prototype) as AddressFormComponent;
    let queries = 0;
    Object.assign(cmp as any, {
      autocompleteResults: [{ id: 1 }],
      addressAutocompleteEnabled: false,
      autocompleteQuery: 'buch',
      onAutocompleteQueryChange: () => {
        queries += 1;
      },
    });
    cmp.onCountryChange();
    expect((cmp as any).autocompleteResults).toEqual([]);
    expect(queries).toBe(0);
    Object.assign(cmp as any, {
      addressAutocompleteEnabled: true,
      autocompleteQuery: 'bucharest',
      autocompleteResults: [{ id: 2 }],
    });
    cmp.onCountryChange();
    expect((cmp as any).autocompleteResults).toEqual([]);
    expect(queries).toBe(1);
  });
});
