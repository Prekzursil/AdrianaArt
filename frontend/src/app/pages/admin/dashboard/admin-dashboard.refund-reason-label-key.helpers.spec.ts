import { AdminDashboardComponent } from "./admin-dashboard.component";

/** Golden WU admin-dashboard-refund-reason-label-key — refundReasonLabelKey. */
describe("AdminDashboardComponent refundReasonLabelKey (golden WU)", () => {
  it("maps allowed reasons; else other", () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    expect(cmp.refundReasonLabelKey("damaged")).toBe("adminUi.dashboard.refundsBreakdown.reasons.damaged");
    expect(cmp.refundReasonLabelKey("Wrong_Item")).toBe("adminUi.dashboard.refundsBreakdown.reasons.wrong_item");
    expect(cmp.refundReasonLabelKey("size_fit")).toBe("adminUi.dashboard.refundsBreakdown.reasons.size_fit");
    expect(cmp.refundReasonLabelKey("weird")).toBe("adminUi.dashboard.refundsBreakdown.reasons.other");
  });
});
