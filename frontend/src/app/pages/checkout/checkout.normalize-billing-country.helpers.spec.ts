import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-normalize-billing-country -- normalizeBillingCountry. */
describe('CheckoutComponent normalizeBillingCountry (golden WU)', () => {
  it('sets invalid error when country code cannot be resolved', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      billingCountryError: '',
      billingCountryInput: 'ZZ',
      billing: { country: '' },
      resolveCountryCode: jasmine.createSpy('resolve').and.returnValue(null),
      translate: { instant: jasmine.createSpy('instant').and.returnValue('invalid') },
      countryInputFromCode: jasmine.createSpy('fromCode'),
      ensurePaymentMethodAvailable: jasmine.createSpy('ensure'),
    });
    cmp.normalizeBillingCountry();
    expect((cmp as any).billingCountryError).toBe('invalid');
    expect((cmp as any).ensurePaymentMethodAvailable).not.toHaveBeenCalled();
  });
});
