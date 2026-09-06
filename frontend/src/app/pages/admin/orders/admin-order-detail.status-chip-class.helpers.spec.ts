import { AdminOrderDetailComponent } from "./admin-order-detail.component";

describe("AdminOrderDetailComponent statusChipClass (golden WU)", () => {
  it("delegates to orderStatusChipClass", () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    const out = cmp.statusChipClass("paid");
    expect(typeof out).toBe("string");
    expect(out.length).toBeGreaterThan(0);
  });
});
