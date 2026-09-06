import { AdminDashboardComponent } from "./admin-dashboard.component";

/** Golden WU admin-dashboard-can-manage-coupon-jobs — canManageCouponJobs. */
describe("AdminDashboardComponent canManageCouponJobs (golden WU)", () => {
  it("requires coupons section access", () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).auth = { canAccessAdminSection: (s: string) => s === "coupons" };
    expect(cmp.canManageCouponJobs()).toBe(true);
    (cmp as any).auth = { canAccessAdminSection: () => false };
    expect(cmp.canManageCouponJobs()).toBe(false);
  });
});
