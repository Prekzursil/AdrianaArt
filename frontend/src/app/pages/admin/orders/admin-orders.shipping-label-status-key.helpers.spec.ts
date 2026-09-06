import { AdminOrdersComponent } from "./admin-orders.component";

/** Golden WU orders-shipping-label-status-key — shippingLabelStatusLabelKey. */
describe("AdminOrdersComponent shippingLabelStatusLabelKey (golden WU)", () => {
  function createCmp() {
    return Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
  }

  it("builds i18n key from status", () => {
    const cmp = createCmp();
    expect(cmp.shippingLabelStatusLabelKey("success" as never)).toBe(
      "adminUi.orders.shippingLabelsModal.status.success",
    );
    expect(cmp.shippingLabelStatusLabelKey("error" as never)).toBe(
      "adminUi.orders.shippingLabelsModal.status.error",
    );
  });
});
