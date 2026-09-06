import { AdminDashboardComponent } from "./admin-dashboard.component";

/** Golden WU admin-dashboard-payments-provider-label-key — paymentsProviderLabelKey. */
describe("AdminDashboardComponent paymentsProviderLabelKey (golden WU)", () => {
  it("maps known providers; else unknown", () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    expect(cmp.paymentsProviderLabelKey("Stripe")).toBe("adminUi.dashboard.paymentsHealth.providers.stripe");
    expect(cmp.paymentsProviderLabelKey("paypal")).toBe("adminUi.dashboard.paymentsHealth.providers.paypal");
    expect(cmp.paymentsProviderLabelKey("NETOPIA")).toBe("adminUi.dashboard.paymentsHealth.providers.netopia");
    expect(cmp.paymentsProviderLabelKey("cod")).toBe("adminUi.dashboard.paymentsHealth.providers.cod");
    expect(cmp.paymentsProviderLabelKey("other")).toBe("adminUi.dashboard.paymentsHealth.providers.unknown");
    expect(cmp.paymentsProviderLabelKey("")).toBe("adminUi.dashboard.paymentsHealth.providers.unknown");
  });
});
