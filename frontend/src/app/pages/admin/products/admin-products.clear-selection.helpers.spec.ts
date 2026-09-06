import { AdminProductsComponent } from "./admin-products.component";

/** Golden WU admin-products-clear-selection — clearSelection. */
describe("AdminProductsComponent clearSelection (golden WU)", () => {
  it("resets selected, clears bulkError, nulls bulkPricePreview", () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).selected = new Set(["p1"]);
    let err: any = "x";
    (cmp as any).bulkError = { set: (v: any) => { err = v; } };
    (cmp as any).bulkPricePreview = { ok: true };
    cmp.clearSelection();
    expect((cmp as any).selected.size).toBe(0);
    expect(err).toBeNull();
    expect((cmp as any).bulkPricePreview).toBeNull();
  });
});
