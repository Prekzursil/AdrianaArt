import { AdminDashboardComponent } from "./admin-dashboard.component";

describe("AdminDashboardComponent hasAnomalyAlerts (golden WU)", () => {
  function bare(failed: any, refunds: any, stockouts: any): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).failedPaymentsAlert = () => failed;
    (cmp as any).refundRequestsAlert = () => refunds;
    (cmp as any).stockoutsAlertCount = () => stockouts;
    return cmp;
  }

  it("is true when any alert signal is present", () => {
    expect(bare(null, null, null).hasAnomalyAlerts()).toBe(false);
    expect(bare({ count: 1 }, null, null).hasAnomalyAlerts()).toBe(true);
    expect(bare(null, { count: 2 }, null).hasAnomalyAlerts()).toBe(true);
    expect(bare(null, null, 0).hasAnomalyAlerts()).toBe(true);
  });
});
