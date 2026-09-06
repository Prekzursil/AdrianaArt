import { AdminOrdersComponent } from "./admin-orders.component";

describe("AdminOrdersComponent currentViewFavoriteKey (golden WU)", () => {
  function bare(filters: unknown): AdminOrdersComponent {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    (cmp as any).currentViewFilters = () => filters;
    return cmp;
  }

  it("builds favorite key via adminFilterFavoriteKey", () => {
    const key = bare({ status: "open" }).currentViewFavoriteKey();
    expect(typeof key).toBe("string");
    expect(key.length).toBeGreaterThan(0);
    expect(key).toContain("orders");
  });
});
