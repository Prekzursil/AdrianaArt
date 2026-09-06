import { AdminDashboardComponent } from "./admin-dashboard.component";

/** Golden WU admin-dashboard-can-show-channel-attribution — canShowChannelAttribution. */
describe("AdminDashboardComponent canShowChannelAttribution (golden WU)", () => {
  it("requires dashboard section access", () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).auth = { canAccessAdminSection: (s: string) => s === "dashboard" };
    expect(cmp.canShowChannelAttribution()).toBe(true);
    (cmp as any).auth = { canAccessAdminSection: () => false };
    expect(cmp.canShowChannelAttribution()).toBe(false);
  });
});
