import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-can-manage-coupon-jobs — canManageCouponJobs. */
describe('AdminDashboardComponent canManageCouponJobs (golden WU)', () => {
  function bare(ok: boolean): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      auth: { canAccessAdminSection: (s: string) => (s === 'coupons' ? ok : false) },
    });
    return cmp;
  }

  it('gates on coupons admin section access', () => {
    expect(bare(true).canManageCouponJobs()).toBe(true);
    expect(bare(false).canManageCouponJobs()).toBe(false);
  });
});
