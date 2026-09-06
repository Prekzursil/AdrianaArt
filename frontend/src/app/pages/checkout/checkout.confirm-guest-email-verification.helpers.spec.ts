import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-confirm-guest-email-verification -- confirmGuestEmailVerification. */
describe('CheckoutComponent confirmGuestEmailVerification (golden WU)', () => {
  it('invokes without throwing when dependencies are stubbed', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      toast: { error: jasmine.createSpy('e'), success: jasmine.createSpy('s') },
      t: (k: string) => k,
      translate: { instant: (k: string) => k },
      load: jasmine.createSpy('load'),
      save: jasmine.createSpy('save'),
      router: { navigate: jasmine.createSpy('nav') },
      cdr: { markForCheck: jasmine.createSpy('mfc') },
    });
    expect(() => (cmp as any).confirmGuestEmailVerification()).not.toThrow();
  });
});
