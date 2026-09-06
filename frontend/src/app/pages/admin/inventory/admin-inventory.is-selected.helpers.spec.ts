import { AdminInventoryComponent } from "./admin-inventory.component";

/** Golden WU admin-inventory-is-selected — isSelected. */
describe("AdminInventoryComponent isSelected (golden WU)", () => {
  it("checks selected set via rowKey(kind:variant|product)", () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    (cmp as any).selected = new Set(["variant:v1", "product:p2"]);
    expect(cmp.isSelected({ kind: "variant", variant_id: "v1", product_id: "p9" } as any)).toBe(true);
    expect(cmp.isSelected({ kind: "product", variant_id: null, product_id: "p2" } as any)).toBe(true);
    expect(cmp.isSelected({ kind: "product", variant_id: null, product_id: "p3" } as any)).toBe(false);
  });
});
