import { AdminOrdersComponent } from "./admin-orders.component";

describe("AdminOrdersComponent shippingLabelStatusPillClass (golden WU)", () => {
  function bare(): AdminOrdersComponent {
    return Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
  }

  it("maps upload status to pill classes", () => {
    const cmp = bare();
    expect(cmp.shippingLabelStatusPillClass("success" as any)).toContain("emerald");
    expect(cmp.shippingLabelStatusPillClass("uploading" as any)).toContain("indigo");
    expect(cmp.shippingLabelStatusPillClass("error" as any)).toContain("rose");
    expect(cmp.shippingLabelStatusPillClass("idle" as any)).toContain("slate");
  });
});
