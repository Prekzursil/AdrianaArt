import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-set-auto-apply-best-coupon-preference -- setAutoApplyBestCouponPreference. */
describe('CheckoutComponent setAutoApplyBestCouponPreference (golden WU)', () => {
  it('persists disabled preference without auto-applying', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      autoApplyBestCoupon: true,
      persistAutoApplyBestCouponPreference: jasmine.createSpy('persist'),
      maybeAutoApplyBestCoupon: jasmine.createSpy('maybe'),
    });
    cmp.setAutoApplyBestCouponPreference(false);
    expect((cmp as any).autoApplyBestCoupon).toBe(false);
    expect((cmp as any).persistAutoApplyBestCouponPreference).toHaveBeenCalledWith(false);
    expect((cmp as any).maybeAutoApplyBestCoupon).not.toHaveBeenCalled();
  });
});
