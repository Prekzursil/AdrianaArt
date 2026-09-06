import { CheckoutComponent } from './checkout.component';

/** Golden WU tip — onBillingSameAsShippingChanged. */
describe('CheckoutComponent onBillingSameAsShippingChanged (golden WU)', () => {
  it('copies shipping into billing when same-as-shipping enabled', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).billingSameAsShipping = true;
    (cmp as any).address = {
      line1: 'A',
      line2: 'B',
      city: 'C',
      region: 'D',
      postal: 'E',
      country: 'RO',
    };
    (cmp as any).billing = {
      line1: '',
      line2: '',
      city: '',
      region: '',
      postal: '',
      country: '',
    };
    (cmp as any).countryInputFromCode = (c: string) => `label:${c}`;
    (cmp as any).billingCountryInput = '';
    (cmp as any).billingCountryError = 'x';
    cmp.onBillingSameAsShippingChanged();
    expect((cmp as any).billing.line1).toBe('A');
    expect((cmp as any).billing.city).toBe('C');
    expect((cmp as any).billing.country).toBe('RO');
    expect((cmp as any).billingCountryInput).toBe('label:RO');
    expect((cmp as any).billingCountryError).toBe('');
  });

  it('no-ops when billing already filled and toggle off', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).billingSameAsShipping = false;
    (cmp as any).billing = { line1: 'keep', line2: '', city: '', region: '', postal: '', country: '' };
    (cmp as any).selectedBillingAddressId = '';
    (cmp as any).savedAddresses = [];
    cmp.onBillingSameAsShippingChanged();
    expect((cmp as any).billing.line1).toBe('keep');
  });
});
