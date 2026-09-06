import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-confirm-consent-modal -- confirmConsentModal. */
describe('CheckoutComponent confirmConsentModal (golden WU)', () => {
  it('accepts terms target and closes modal', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      consentModalTarget: 'terms',
      acceptTerms: false,
      acceptPrivacy: false,
      consentError: 'err',
      closeConsentModal: jasmine.createSpy('closeConsentModal'),
    });
    cmp.confirmConsentModal();
    expect((cmp as any).acceptTerms).toBe(true);
    expect((cmp as any).acceptPrivacy).toBe(false);
    expect((cmp as any).consentError).toBe('');
    expect((cmp as any).closeConsentModal).toHaveBeenCalled();
  });
});
