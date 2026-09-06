import { AdminInventoryComponent } from "./admin-inventory.component";

/** Golden WU inventory-row-key — rowKey. */
describe("AdminInventoryComponent rowKey (golden WU)", () => {
  function createCmp() {
    return Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
  }

  it("builds kind:variant_or_product key", () => {
    const cmp = createCmp();
    const rowKey = (AdminInventoryComponent.prototype as any).rowKey as (
      this: AdminInventoryComponent,
      row: { kind: string; variant_id?: string | null; product_id?: string | null },
    ) => string;
    expect(rowKey.call(cmp, { kind: "variant", variant_id: "v1", product_id: "p1" })).toBe("variant:v1");
    expect(rowKey.call(cmp, { kind: "product", variant_id: null, product_id: "p9" })).toBe("product:p9");
    expect(rowKey.call(cmp, { kind: "product", variant_id: "", product_id: "p2" })).toBe("product:p2");
  });
});
