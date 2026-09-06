import { AddressFormComponent } from './address-form.component';

/** Golden WU address-form-phone-e164 — phoneE164. */
describe('AddressFormComponent phoneE164 (golden WU)', () => {
  it('returns null for empty or invalid national numbers', () => {
    const cmp = Object.create(AddressFormComponent.prototype) as AddressFormComponent;
    Object.assign(cmp as any, { phoneCountry: 'RO', phoneNational: '' });
    expect(cmp.phoneE164()).toBeNull();
    Object.assign(cmp as any, { phoneNational: '12' });
    expect(cmp.phoneE164()).toBeNull();
    Object.assign(cmp as any, { phoneCountry: null, phoneNational: '' });
    expect(cmp.phoneE164()).toBeNull();
  });
});
