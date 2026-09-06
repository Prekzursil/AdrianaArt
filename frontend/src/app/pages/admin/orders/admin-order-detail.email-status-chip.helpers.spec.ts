import { AdminOrderDetailComponent } from "./admin-order-detail.component";

describe("AdminOrderDetailComponent emailStatusChipClass (golden WU)", () => {
  function bare(): AdminOrderDetailComponent {
    return Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
  }

  it("maps status to chip classes", () => {
    const cmp = bare();
    expect(cmp.emailStatusChipClass("sent")).toContain("emerald");
    expect(cmp.emailStatusChipClass("failed")).toContain("rose");
    expect(cmp.emailStatusChipClass("queued")).toContain("slate");
  });
});
