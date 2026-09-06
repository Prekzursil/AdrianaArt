import { AddressFormComponent } from './address-form.component';

/** Golden WU address-form-postal-example — postalExample. */
describe('AddressFormComponent postalExample (golden WU)', () => {
  it('maps country codes to postal examples with a numeric fallback', () => {
    const cmp = Object.create(AddressFormComponent.prototype) as AddressFormComponent;
    Object.assign(cmp as any, { model: { country: 'RO' } });
    expect(cmp.postalExample).toBe('123456');
    Object.assign(cmp as any, { model: { country: '  gb ' } });
    expect(cmp.postalExample).toBe('SW1A 1AA');
    Object.assign(cmp as any, { model: { country: 'ZZ' } });
    expect(cmp.postalExample).toBe('12345');
  });
});
