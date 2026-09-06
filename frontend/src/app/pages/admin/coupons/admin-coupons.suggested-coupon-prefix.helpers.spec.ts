import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-suggested-coupon-prefix -- suggestedCouponPrefix. */
describe('AdminCouponsComponent suggestedCouponPrefix (golden WU)', () => {
  it('prefers promotion key then name then COUPON', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      selectedPromotion: jasmine.createSpy('selectedPromotion').and.returnValue({
        key: 'SUMMER',
        name: 'Summer Sale',
      }),
    });
    expect((cmp as any).suggestedCouponPrefix()).toBe('SUMMER');
    (cmp as any).selectedPromotion.and.returnValue({ key: '', name: 'Fall' });
    expect((cmp as any).suggestedCouponPrefix()).toBe('Fall');
    (cmp as any).selectedPromotion.and.returnValue(null);
    expect((cmp as any).suggestedCouponPrefix()).toBe('COUPON');
  });
});
