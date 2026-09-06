import { AdminInventoryComponent } from "./admin-inventory.component";

/** Golden WU admin-inventory-all-selected-on-page — allSelectedOnPage. */
describe("AdminInventoryComponent allSelectedOnPage (golden WU)", () => {
  it("false when empty; else every row selected via rowKey", () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    (cmp as any).rows = () => [];
    (cmp as any).selected = new Set();
    expect(cmp.allSelectedOnPage()).toBe(false);
    const rows = [
      { kind: "variant", variant_id: "v1", product_id: "p1" },
      { kind: "product", variant_id: null, product_id: "p2" },
    ];
    (cmp as any).rows = () => rows;
    (cmp as any).selected = new Set(["variant:v1"]);
    expect(cmp.allSelectedOnPage()).toBe(false);
    (cmp as any).selected = new Set(["variant:v1", "product:p2"]);
    expect(cmp.allSelectedOnPage()).toBe(true);
  });
});
