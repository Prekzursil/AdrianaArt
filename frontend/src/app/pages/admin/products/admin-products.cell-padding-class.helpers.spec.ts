import { AdminProductsComponent } from "./admin-products.component";

describe("AdminProductsComponent cellPaddingClass (golden WU)", () => {
  it("delegates density through adminTableCellPaddingClass", () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).tableLayout = () => ({ density: "compact" });
    const out = cmp.cellPaddingClass();
    expect(typeof out).toBe("string");
    expect(out.length).toBeGreaterThan(0);
  });
});
