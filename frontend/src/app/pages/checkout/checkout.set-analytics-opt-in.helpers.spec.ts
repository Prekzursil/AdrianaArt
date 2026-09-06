import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-set-analytics-opt-in -- setAnalyticsOptIn. */
describe('CheckoutComponent setAnalyticsOptIn (golden WU)', () => {
  it('enables analytics and tracks start only when opting in', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      analytics: { setEnabled: jasmine.createSpy('setEnabled') },
      trackCheckoutStart: jasmine.createSpy('trackCheckoutStart'),
    });

    cmp.setAnalyticsOptIn(false);
    expect((cmp as any).analytics.setEnabled).toHaveBeenCalledWith(false);
    expect((cmp as any).trackCheckoutStart).not.toHaveBeenCalled();

    cmp.setAnalyticsOptIn(true);
    expect((cmp as any).analytics.setEnabled).toHaveBeenCalledWith(true);
    expect((cmp as any).trackCheckoutStart).toHaveBeenCalled();
  });
});
