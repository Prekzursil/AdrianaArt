import { AdminOrderDetailComponent } from "./admin-order-detail.component";

/** Golden WU admin-order-can-refund — canRefund. */
describe("AdminOrderDetailComponent canRefund (golden WU)", () => {
  it("allows paid/shipped/delivered", () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).order = () => ({ status: "paid" });
    expect(cmp.canRefund()).toBe(true);
    (cmp as any).order = () => ({ status: "Shipped" });
    expect(cmp.canRefund()).toBe(true);
    (cmp as any).order = () => ({ status: "delivered" });
    expect(cmp.canRefund()).toBe(true);
    (cmp as any).order = () => ({ status: "pending" });
    expect(cmp.canRefund()).toBe(false);
    (cmp as any).order = () => null;
    expect(cmp.canRefund()).toBe(false);
  });
});
