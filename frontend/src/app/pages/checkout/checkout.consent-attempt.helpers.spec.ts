import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-consent-attempt — N=3 onCheckoutConsentAttempt early-return arms. */
describe('CheckoutComponent onCheckoutConsentAttempt helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).consentError = 'x';
    (cmp as any).consentLocked = false;
    (cmp as any).legalConsentsLoading = false;
    (cmp as any).acceptTerms = false;
    (cmp as any).acceptPrivacy = false;
    (cmp as any).consentModalOpen = false;
    (cmp as any).consentModalSlug = '';
    (cmp as any).consentModalTarget = null;
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  function event(): Event {
    return {
      preventDefault: jasmine.createSpy('preventDefault'),
      stopPropagation: jasmine.createSpy('stopPropagation'),
    } as any;
  }

  it('returns early when consentLocked', () => {
    const cmp = createCmp({ consentLocked: true });
    const ev = event();
    cmp.onCheckoutConsentAttempt(ev, 'terms');
    expect(ev.preventDefault).toHaveBeenCalled();
    expect((cmp as any).consentError).toBe('');
    expect((cmp as any).consentModalOpen).toBe(false);
  });

  it('returns early when legalConsentsLoading', () => {
    const cmp = createCmp({ legalConsentsLoading: true });
    cmp.onCheckoutConsentAttempt(event(), 'privacy');
    expect((cmp as any).consentModalOpen).toBe(false);
  });

  it('returns early when target already accepted; otherwise opens modal', () => {
    const accepted = createCmp({ acceptTerms: true });
    accepted.onCheckoutConsentAttempt(event(), 'terms');
    expect((accepted as any).consentModalOpen).toBe(false);

    const open = createCmp();
    open.onCheckoutConsentAttempt(event(), 'terms');
    expect((open as any).consentModalOpen).toBe(true);
    expect((open as any).consentModalTarget).toBe('terms');
    expect((open as any).consentModalSlug).toBe('terms-and-conditions');
  });
});
