import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU admin-coupons-assign -- assign. */
describe('AdminCouponsComponent assign (golden WU)', () => {
  it('returns early when no coupon is selected', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      selectedCoupon: jasmine.createSpy('sel').and.returnValue(null),
      toast: { error: jasmine.createSpy('error') },
      adminCoupons: { assignCoupon: jasmine.createSpy('assign') },
    });
    cmp.assign();
    expect((cmp as any).adminCoupons.assignCoupon).not.toHaveBeenCalled();
  });
});
