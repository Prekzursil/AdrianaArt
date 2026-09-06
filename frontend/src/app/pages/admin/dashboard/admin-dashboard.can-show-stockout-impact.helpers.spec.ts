import { AdminDashboardComponent } from "./admin-dashboard.component";

/** Golden WU admin-dashboard-can-show-stockout-impact — canShowStockoutImpact. */
describe("AdminDashboardComponent canShowStockoutImpact (golden WU)", () => {
  it("requires inventory section access", () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).auth = { canAccessAdminSection: (s: string) => s === "inventory" };
    expect(cmp.canShowStockoutImpact()).toBe(true);
    (cmp as any).auth = { canAccessAdminSection: () => false };
    expect(cmp.canShowStockoutImpact()).toBe(false);
  });
});
