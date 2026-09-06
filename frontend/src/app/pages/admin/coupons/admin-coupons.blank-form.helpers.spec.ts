import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-blank-form — blankCouponForm. */
describe('AdminCouponsComponent blankCouponForm (golden WU)', () => {
  it('returns empty public active coupon form', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as any;
    expect(cmp.blankCouponForm()).toEqual({
      promotion_id: '',
      code: '',
      visibility: 'public',
      is_active: true,
      starts_at: '',
      ends_at: '',
      global_max_redemptions: '',
      per_customer_max_redemptions: '',
    });
  });
});
