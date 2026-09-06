import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-copy-billing — copyShippingToBilling / step3Complete. */
describe('CheckoutComponent copy-billing helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      billingSameAsShipping: false,
      selectedBillingAddressId: 'addr-1',
      address: {
        line1: 'A',
        line2: 'B',
        city: 'C',
        region: 'D',
        postal: 'E',
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
      step2Complete: () => true,
      ...overrides,
    });
    return cmp;
  }

  it('copyShippingToBilling no-ops when billingSameAsShipping', () => {
    const cmp = createCmp({ billingSameAsShipping: true });
    cmp.copyShippingToBilling();
    expect((cmp as any).selectedBillingAddressId).toBe('addr-1');
    expect((cmp as any).billing.line1).toBe('');
  });

  it('copyShippingToBilling copies address fields and clears selection', () => {
    const cmp = createCmp();
    cmp.copyShippingToBilling();
    expect((cmp as any).selectedBillingAddressId).toBe('');
    expect((cmp as any).billing.line1).toBe('A');
    expect((cmp as any).billing.city).toBe('C');
    expect((cmp as any).billing.country).toBe('RO');
    expect((cmp as any).billingCountryInput).toBe('Romania');
    expect((cmp as any).billingCountryError).toBe('');
  });

  it('step3Complete delegates to step2Complete', () => {
    expect(createCmp({ step2Complete: () => true }).step3Complete()).toBe(true);
    expect(createCmp({ step2Complete: () => false }).step3Complete()).toBe(false);
  });
});
