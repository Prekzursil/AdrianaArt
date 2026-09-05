import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-consent-modal — N=3 consentBlocking / confirmConsentModal / closeConsentModal. */
describe('CheckoutComponent consent modal helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).auth = { isAuthenticated: () => false };
    (cmp as any).legalConsentsLoading = false;
    (cmp as any).acceptTerms = false;
    (cmp as any).acceptPrivacy = false;
    (cmp as any).consentLocked = false;
    (cmp as any).consentModalOpen = true;
    (cmp as any).consentModalSlug = 'terms-and-conditions';
    (cmp as any).consentModalTarget = 'terms' as 'terms' | 'privacy' | null;
    (cmp as any).consentError = 'err';
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('consentBlocking respects auth+loading and accept flags', () => {
    expect(createCmp().consentBlocking()).toBe(true);
    expect(createCmp({ acceptTerms: true, acceptPrivacy: true }).consentBlocking()).toBe(false);
    expect(
      createCmp({
        auth: { isAuthenticated: () => true },
        legalConsentsLoading: true,
        acceptTerms: true,
        acceptPrivacy: true,
      }).consentBlocking(),
    ).toBe(true);
  });

  it('confirmConsentModal accepts targeted consent then closes', () => {
    const terms = createCmp({ consentModalTarget: 'terms', acceptTerms: false });
    terms.confirmConsentModal();
    expect((terms as any).acceptTerms).toBe(true);
    expect((terms as any).consentModalOpen).toBe(false);
    expect((terms as any).consentModalSlug).toBe('');
    expect((terms as any).consentModalTarget).toBeNull();
    expect((terms as any).consentError).toBe('');

    const privacy = createCmp({ consentModalTarget: 'privacy', acceptPrivacy: false });
    privacy.confirmConsentModal();
    expect((privacy as any).acceptPrivacy).toBe(true);
    expect((privacy as any).consentModalOpen).toBe(false);
  });

  it('closeConsentModal clears modal state', () => {
    const cmp = createCmp();
    cmp.closeConsentModal();
    expect((cmp as any).consentModalOpen).toBe(false);
    expect((cmp as any).consentModalSlug).toBe('');
    expect((cmp as any).consentModalTarget).toBeNull();
  });
});
