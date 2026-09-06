import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent copyShippingToBilling (golden WU)', () => {
  it('no-ops when same-as-shipping; otherwise copies address fields', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as any;
    cmp.billingSameAsShipping = true;
    cmp.selectedBillingAddressId = 'keep';
    cmp.address = { line1: 'A', line2: 'B', city: 'C', region: 'D', postal: 'E', country: 'RO' };
    cmp.billing = { line1: '', line2: '', city: '', region: '', postal: '', country: '' };
    cmp.shippingCountryInput = 'RO — Romania';
    cmp.billingCountryInput = 'old';
    cmp.billingCountryError = 'err';
    cmp.copyShippingToBilling();
    expect(cmp.selectedBillingAddressId).toBe('keep');

    cmp.billingSameAsShipping = false;
    cmp.copyShippingToBilling();
    expect(cmp.selectedBillingAddressId).toBe('');
    expect(cmp.billing).toEqual(cmp.address);
    expect(cmp.billingCountryInput).toBe('RO — Romania');
    expect(cmp.billingCountryError).toBe('');
  });
});
