import { AdminDashboardComponent } from "./admin-dashboard.component";

/** Golden WU admin-dashboard-is-metric-widget-hidden — isMetricWidgetHidden. */
describe("AdminDashboardComponent isMetricWidgetHidden (golden WU)", () => {
  it("reads metricWidgetHidden signal map", () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).metricWidgetHidden = () => ({ revenue: true, orders: false });
    expect(cmp.isMetricWidgetHidden("revenue" as any)).toBe(true);
    expect(cmp.isMetricWidgetHidden("orders" as any)).toBe(false);
    expect(cmp.isMetricWidgetHidden("missing" as any)).toBe(false);
  });
});
