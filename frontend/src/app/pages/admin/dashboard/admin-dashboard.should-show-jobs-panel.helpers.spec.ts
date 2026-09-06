import { AdminDashboardComponent } from "./admin-dashboard.component";

/** Golden WU admin-dashboard-should-show-jobs-panel — shouldShowJobsPanel. */
describe("AdminDashboardComponent shouldShowJobsPanel (golden WU)", () => {
  it("is true when auth can access users or coupons", () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).auth = { canAccessAdminSection: (s: string) => s === "users" };
    expect(cmp.shouldShowJobsPanel()).toBe(true);
    (cmp as any).auth = { canAccessAdminSection: (s: string) => s === "coupons" };
    expect(cmp.shouldShowJobsPanel()).toBe(true);
    (cmp as any).auth = { canAccessAdminSection: () => false };
    expect(cmp.shouldShowJobsPanel()).toBe(false);
  });
});
