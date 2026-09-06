import { AdminDashboardComponent } from "./admin-dashboard.component";

/** Golden WU admin-dashboard-can-show-refunds-breakdown — canShowRefundsBreakdown. */
describe("AdminDashboardComponent canShowRefundsBreakdown (golden WU)", () => {
  it("is true for orders or returns access", () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).auth = { canAccessAdminSection: (s: string) => s === "orders" };
    expect(cmp.canShowRefundsBreakdown()).toBe(true);
    (cmp as any).auth = { canAccessAdminSection: (s: string) => s === "returns" };
    expect(cmp.canShowRefundsBreakdown()).toBe(true);
    (cmp as any).auth = { canAccessAdminSection: () => false };
    expect(cmp.canShowRefundsBreakdown()).toBe(false);
  });
});
