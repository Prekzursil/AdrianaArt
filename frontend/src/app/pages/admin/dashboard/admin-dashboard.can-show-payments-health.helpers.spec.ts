import { AdminDashboardComponent } from "./admin-dashboard.component";

/** Golden WU admin-dashboard-can-show-payments-health — canShowPaymentsHealth. */
describe("AdminDashboardComponent canShowPaymentsHealth (golden WU)", () => {
  it("requires ops section access", () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).auth = { canAccessAdminSection: (s: string) => s === "ops" };
    expect(cmp.canShowPaymentsHealth()).toBe(true);
    (cmp as any).auth = { canAccessAdminSection: () => false };
    expect(cmp.canShowPaymentsHealth()).toBe(false);
  });
});
