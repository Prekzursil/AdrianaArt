import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-close-consent-modal -- closeConsentModal. */
describe('CheckoutComponent closeConsentModal (golden WU)', () => {
  it('closes consent modal and clears slug/target', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      consentModalOpen: true,
      consentModalSlug: 'terms',
      consentModalTarget: 'checkout',
    });
    cmp.closeConsentModal();
    expect((cmp as any).consentModalOpen).toBe(false);
    expect((cmp as any).consentModalSlug).toBe('');
    expect((cmp as any).consentModalTarget).toBeNull();
  });
});
