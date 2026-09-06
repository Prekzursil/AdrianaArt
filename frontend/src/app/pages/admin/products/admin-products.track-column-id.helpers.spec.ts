import { AdminProductsComponent } from "./admin-products.component";

/** Golden WU admin-products-track-column-id — trackColumnId. */
describe("AdminProductsComponent trackColumnId (golden WU)", () => {
  it("returns colId", () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    expect(cmp.trackColumnId(1, "sku")).toBe("sku");
  });
});
