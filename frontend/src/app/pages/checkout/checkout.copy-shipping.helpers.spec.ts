import { CheckoutComponent } from './checkout.component';

/** Golden WU — copyShippingToBilling. */
describe('CheckoutComponent copyShippingToBilling (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      billingSameAsShipping: false,
      selectedBillingAddressId: 'addr-1',
      address: {
        line1: 'Str 1',
        line2: 'Bl A',
        city: 'Bucuresti',
        region: 'B',
        postal: '010101',
        country: 'RO',
      },
      billing: {
        line1: '',
        line2: '',
        city: '',
        region: '',
        postal: '',
        country: '',
      },
      shippingCountryInput: 'Romania',
      billingCountryInput: '',
      billingCountryError: 'err',
      ...overrides,
    });
    return cmp;
  }

  it('no-ops when billingSameAsShipping is true', () => {
    const cmp = bare({ billingSameAsShipping: true });
    cmp.copyShippingToBilling();
    expect((cmp as any).billing.line1).toBe('');
    expect((cmp as any).selectedBillingAddressId).toBe('addr-1');
  });

  it('copies shipping address fields into billing and clears selection/error', () => {
    const cmp = bare();
    cmp.copyShippingToBilling();
    expect((cmp as any).selectedBillingAddressId).toBe('');
    expect((cmp as any).billing).toEqual({
      line1: 'Str 1',
      line2: 'Bl A',
      city: 'Bucuresti',
      region: 'B',
      postal: '010101',
      country: 'RO',
    });
    expect((cmp as any).billingCountryInput).toBe('Romania');
    expect((cmp as any).billingCountryError).toBe('');
  });
});
