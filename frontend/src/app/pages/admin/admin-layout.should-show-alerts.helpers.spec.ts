import { AdminLayoutComponent } from "./admin-layout.component";

/** Golden WU admin-layout-should-show-alerts — shouldShowAlerts. */
describe("AdminLayoutComponent shouldShowAlerts (golden WU)", () => {
  it("hides for owner_basic; else respects loading/error/counts+access", () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    (cmp as any).uiPrefs = { preset: () => "owner_basic" };
    (cmp as any).auth = { canAccessAdminSection: () => true };
    (cmp as any).alertsLoading = false;
    (cmp as any).alertsError = null;
    (cmp as any).lowStockCount = 5;
    (cmp as any).failedWebhooksCount = 0;
    (cmp as any).failedEmailsCount = 0;
    expect(cmp.shouldShowAlerts()).toBe(false);

    (cmp as any).uiPrefs = { preset: () => "custom" };
    (cmp as any).alertsLoading = true;
    expect(cmp.shouldShowAlerts()).toBe(true);
    (cmp as any).alertsLoading = false;
    (cmp as any).alertsError = "boom";
    expect(cmp.shouldShowAlerts()).toBe(true);
    (cmp as any).alertsError = null;
    (cmp as any).lowStockCount = 2;
    (cmp as any).auth = { canAccessAdminSection: (s: string) => s === "inventory" };
    expect(cmp.shouldShowAlerts()).toBe(true);
    (cmp as any).lowStockCount = 0;
    (cmp as any).failedWebhooksCount = 1;
    (cmp as any).auth = { canAccessAdminSection: (s: string) => s === "ops" };
    expect(cmp.shouldShowAlerts()).toBe(true);
    (cmp as any).failedWebhooksCount = 0;
    (cmp as any).failedEmailsCount = 1;
    expect(cmp.shouldShowAlerts()).toBe(true);
    (cmp as any).failedEmailsCount = 0;
    expect(cmp.shouldShowAlerts()).toBe(false);
  });
});
