import { AdminDashboardComponent } from "./admin-dashboard.component";

/** Golden WU admin-dashboard-supports-webhook-metrics — supportsWebhookMetrics. */
describe("AdminDashboardComponent supportsWebhookMetrics (golden WU)", () => {
  it("true for stripe/paypal only", () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    expect(cmp.supportsWebhookMetrics("stripe")).toBe(true);
    expect(cmp.supportsWebhookMetrics("PayPal")).toBe(true);
    expect(cmp.supportsWebhookMetrics("netopia")).toBe(false);
    expect(cmp.supportsWebhookMetrics("")).toBe(false);
  });
});
