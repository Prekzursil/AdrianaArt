import { AddressFormComponent } from './address-form.component';

/** Golden WU address-form-postal-pattern — postalPattern. */
describe('AddressFormComponent postalPattern (golden WU)', () => {
  it('returns country-specific postal regexes and a generic fallback', () => {
    const cmp = Object.create(AddressFormComponent.prototype) as AddressFormComponent;
    Object.assign(cmp as any, { model: { country: 'RO' } });
    expect(cmp.postalPattern).toBe('^\\d{6}$');
    Object.assign(cmp as any, { model: { country: 'US' } });
    expect(cmp.postalPattern).toBe('^\\d{5}(-\\d{4})?$');
    Object.assign(cmp as any, { model: { country: 'XX' } });
    expect(cmp.postalPattern).toBe('^[A-Za-z0-9 -]{3,12}$');
  });
});
