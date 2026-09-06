import { AdminDashboardComponent } from "./admin-dashboard.component";

/** Golden WU admin-dashboard-can-show-shipping-performance — canShowShippingPerformance. */
describe("AdminDashboardComponent canShowShippingPerformance (golden WU)", () => {
  it("requires orders section access", () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).auth = { canAccessAdminSection: (s: string) => s === "orders" };
    expect(cmp.canShowShippingPerformance()).toBe(true);
    (cmp as any).auth = { canAccessAdminSection: () => false };
    expect(cmp.canShowShippingPerformance()).toBe(false);
  });
});
