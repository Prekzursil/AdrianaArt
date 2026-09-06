import { AdminDashboardComponent } from "./admin-dashboard.component";

/** Golden WU admin-dashboard-can-manage-gdpr-jobs — canManageGdprJobs. */
describe("AdminDashboardComponent canManageGdprJobs (golden WU)", () => {
  it("delegates to auth.isAdmin", () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).auth = { isAdmin: () => true };
    expect(cmp.canManageGdprJobs()).toBe(true);
    (cmp as any).auth = { isAdmin: () => false };
    expect(cmp.canManageGdprJobs()).toBe(false);
  });
});
