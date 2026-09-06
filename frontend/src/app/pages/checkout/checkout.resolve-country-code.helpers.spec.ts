import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent resolveCountryCode (golden WU)', () => {
  it('resolves by code, exact name, and stripped suffixes', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as any;
    cmp.countries = [
      { code: 'RO', name: 'Romania' },
      { code: 'US', name: 'United States' },
    ];
    expect(cmp.resolveCountryCode('')).toBeNull();
    expect(cmp.resolveCountryCode('ro')).toBe('RO');
    expect(cmp.resolveCountryCode('RO — Romania')).toBe('RO');
    expect(cmp.resolveCountryCode('Romania')).toBe('RO');
    expect(cmp.resolveCountryCode('United States (us)')).toBe('US');
    expect(cmp.resolveCountryCode('United States — us')).toBe('US');
    expect(cmp.resolveCountryCode('Narnia')).toBeNull();
  });
});
