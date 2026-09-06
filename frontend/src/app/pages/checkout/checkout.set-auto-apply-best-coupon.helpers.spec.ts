import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-set-auto-apply-best-coupon -- setAutoApplyBestCouponPreference. */
describe('CheckoutComponent setAutoApplyBestCouponPreference (golden WU)', () => {
  it('persists preference and auto-applies only when enabled', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      autoApplyBestCoupon: false,
      persistAutoApplyBestCouponPreference: jasmine.createSpy('persist'),
      maybeAutoApplyBestCoupon: jasmine.createSpy('maybeAuto'),
    });

    cmp.setAutoApplyBestCouponPreference(false);
    expect((cmp as any).autoApplyBestCoupon).toBe(false);
    expect((cmp as any).persistAutoApplyBestCouponPreference).toHaveBeenCalledWith(false);
    expect((cmp as any).maybeAutoApplyBestCoupon).not.toHaveBeenCalled();

    cmp.setAutoApplyBestCouponPreference(true);
    expect((cmp as any).autoApplyBestCoupon).toBe(true);
    expect((cmp as any).maybeAutoApplyBestCoupon).toHaveBeenCalled();
  });
});
