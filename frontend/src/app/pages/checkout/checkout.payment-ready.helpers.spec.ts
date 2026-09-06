import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-payment-ready-helpers. */
describe('CheckoutComponent payment/consent helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      currency: 'RON',
      netopiaEnabled: true,
      paypalEnabled: true,
      stripeEnabled: true,
      currentShippingCountryCode: () => 'RO',
      auth: { isAuthenticated: () => false },
      legalConsentsLoading: false,
      acceptTerms: true,
      acceptPrivacy: true,
      consentError: '',
      translate: { instant: (k: string) => k },
      paymentNotReady: false,
      paymentNotReadyTimer: null,
      errorMessage: 'x',
      ...overrides,
    });
    return cmp;
  }

  it('isPaymentMethodAvailable gates by currency/country/flags', () => {
    const cmp = bare();
    expect(cmp.isPaymentMethodAvailable('cod')).toBe(true);
    expect(cmp.isPaymentMethodAvailable('netopia')).toBe(true);
    expect(cmp.isPaymentMethodAvailable('paypal')).toBe(true);
    expect(cmp.isPaymentMethodAvailable('stripe')).toBe(true);
    expect(bare({ currency: 'EUR' }).isPaymentMethodAvailable('cod')).toBe(false);
    expect(bare({ stripeEnabled: false }).isPaymentMethodAvailable('stripe')).toBe(false);
  });

  it('validateLegalConsents requires terms/privacy', () => {
    const ok = (CheckoutComponent.prototype as any).validateLegalConsents.bind(bare());
    expect(ok()).toBe(true);
    const bad = (CheckoutComponent.prototype as any).validateLegalConsents.bind(
      bare({ acceptTerms: false }),
    );
    expect(bad()).toBe(false);
  });

  it('showPaymentNotReady clears error and arms timer', () => {
    jasmine.clock().install();
    const cmp = bare();
    (CheckoutComponent.prototype as any).showPaymentNotReady.call(cmp);
    expect((cmp as any).errorMessage).toBe('');
    expect((cmp as any).paymentNotReady).toBe(true);
    jasmine.clock().tick(6000);
    expect((cmp as any).paymentNotReady).toBe(false);
    jasmine.clock().uninstall();
  });
});
