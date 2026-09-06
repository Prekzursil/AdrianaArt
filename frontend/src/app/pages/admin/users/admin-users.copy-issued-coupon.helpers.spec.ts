import { AdminUsersComponent } from './admin-users.component';

/** Golden WU admin-users-copy-issued-coupon -- copyIssuedCoupon. */
describe('AdminUsersComponent copyIssuedCoupon (golden WU)', () => {
  it('returns early when issued coupon code is missing', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      couponIssuedCode: jasmine.createSpy('code').and.returnValue(null),
      toast: { success: jasmine.createSpy('ok') },
    });
    cmp.copyIssuedCoupon();
    expect((cmp as any).toast.success).not.toHaveBeenCalled();
  });
});
