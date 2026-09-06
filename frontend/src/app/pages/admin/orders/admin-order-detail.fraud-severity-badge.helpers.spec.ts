import { AdminOrderDetailComponent } from "./admin-order-detail.component";

describe("AdminOrderDetailComponent fraudSeverityBadgeClass (golden WU)", () => {
  function bare(): AdminOrderDetailComponent {
    return Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
  }

  it("maps severity to badge classes", () => {
    const cmp = bare();
    expect(cmp.fraudSeverityBadgeClass("high" as any)).toContain("rose");
    expect(cmp.fraudSeverityBadgeClass("medium" as any)).toContain("amber");
    expect(cmp.fraudSeverityBadgeClass("low" as any)).toContain("sky");
    expect(cmp.fraudSeverityBadgeClass("unknown" as any)).toContain("slate");
  });
});
