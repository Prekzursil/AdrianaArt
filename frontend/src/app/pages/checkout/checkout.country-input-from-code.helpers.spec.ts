import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent countryInputFromCode (golden WU)', () => {
  it('formats known codes and returns normalized unknown codes', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as any;
    cmp.countries = [{ code: 'RO', name: 'Romania' }];
    expect(cmp.countryInputFromCode('')).toBe('');
    expect(cmp.countryInputFromCode('ro')).toBe('RO — Romania');
    expect(cmp.countryInputFromCode('XX')).toBe('XX');
  });
});
