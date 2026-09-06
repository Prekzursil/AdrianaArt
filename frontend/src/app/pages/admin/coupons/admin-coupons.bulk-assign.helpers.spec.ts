import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU admin-coupons-bulk-assign -- bulkAssign. */
describe('AdminCouponsComponent bulkAssign (golden WU)', () => {
  it('returns early when no coupon is selected', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      selectedCoupon: jasmine.createSpy('sel').and.returnValue(null),
      bulkEmails: ['a@b.com'],
      bulkBusy: { set: jasmine.createSpy('busy') },
      adminCoupons: { bulkAssignCoupon: jasmine.createSpy('bulk') },
    });
    cmp.bulkAssign();
    expect((cmp as any).bulkBusy.set).not.toHaveBeenCalled();
  });
});
