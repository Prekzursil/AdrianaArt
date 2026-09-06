import { AdminDashboardComponent } from "./admin-dashboard.component";

/** Golden WU admin-dashboard-refund-provider-label-key — refundProviderLabelKey. */
describe("AdminDashboardComponent refundProviderLabelKey (golden WU)", () => {
  it("maps stripe/paypal/manual; else unknown", () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    expect(cmp.refundProviderLabelKey("stripe")).toBe("adminUi.dashboard.refundsBreakdown.providers.stripe");
    expect(cmp.refundProviderLabelKey("PayPal")).toBe("adminUi.dashboard.refundsBreakdown.providers.paypal");
    expect(cmp.refundProviderLabelKey("manual")).toBe("adminUi.dashboard.refundsBreakdown.providers.manual");
    expect(cmp.refundProviderLabelKey("cod")).toBe("adminUi.dashboard.refundsBreakdown.providers.unknown");
  });
});
