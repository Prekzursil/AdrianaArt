import { AdminOrdersComponent } from "./admin-orders.component";

/** Golden WU admin-orders-track-order-id — trackOrderId. */
describe("AdminOrdersComponent trackOrderId (golden WU)", () => {
  it("returns order.id", () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    expect(cmp.trackOrderId(0, { id: "ord_1" } as any)).toBe("ord_1");
  });
});
