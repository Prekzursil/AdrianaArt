import { AdminOrdersComponent } from "./admin-orders.component";

/** Golden WU admin-orders-track-column-id — trackColumnId. */
describe("AdminOrdersComponent trackColumnId (golden WU)", () => {
  it("returns colId", () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    expect(cmp.trackColumnId(2, "status")).toBe("status");
  });
});
