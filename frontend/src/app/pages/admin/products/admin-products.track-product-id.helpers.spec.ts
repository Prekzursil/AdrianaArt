import { AdminProductsComponent } from "./admin-products.component";

/** Golden WU admin-products-track-product-id — trackProductId. */
describe("AdminProductsComponent trackProductId (golden WU)", () => {
  it("returns product.id", () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    expect(cmp.trackProductId(0, { id: "p1" } as any)).toBe("p1");
  });
});
