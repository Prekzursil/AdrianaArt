import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent consentBlocking (golden WU)', () => {
  function createCmp(opts: {
    authenticated?: boolean;
    legalConsentsLoading?: boolean;
    acceptTerms?: boolean;
    acceptPrivacy?: boolean;
  }) {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).auth = { isAuthenticated: () => opts.authenticated ?? false };
    (cmp as any).legalConsentsLoading = opts.legalConsentsLoading ?? false;
    (cmp as any).acceptTerms = opts.acceptTerms ?? true;
    (cmp as any).acceptPrivacy = opts.acceptPrivacy ?? true;
    return cmp;
  }

  it('blocks while authenticated consents load or when terms/privacy unchecked', () => {
    expect(createCmp({ authenticated: true, legalConsentsLoading: true }).consentBlocking()).toBe(true);
    expect(createCmp({ authenticated: true, legalConsentsLoading: false }).consentBlocking()).toBe(false);
    expect(createCmp({ acceptTerms: false }).consentBlocking()).toBe(true);
    expect(createCmp({ acceptPrivacy: false }).consentBlocking()).toBe(true);
    expect(createCmp({}).consentBlocking()).toBe(false);
  });
});
