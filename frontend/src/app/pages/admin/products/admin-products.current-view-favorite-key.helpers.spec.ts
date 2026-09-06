import { AdminProductsComponent } from "./admin-products.component";

describe("AdminProductsComponent currentViewFavoriteKey (golden WU)", () => {
  function bare(filters: unknown): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).currentViewFilters = () => filters;
    return cmp;
  }

  it("builds favorite key via adminFilterFavoriteKey", () => {
    const key = bare({ q: "mug" }).currentViewFavoriteKey();
    expect(typeof key).toBe("string");
    expect(key.length).toBeGreaterThan(0);
    expect(key).toContain("products");
  });
});
