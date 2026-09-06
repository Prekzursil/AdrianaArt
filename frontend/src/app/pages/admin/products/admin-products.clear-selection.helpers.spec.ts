import { AdminProductsComponent } from "./admin-products.component";

/** Golden WU admin-products-clear-selection — clearSelection. */
describe("AdminProductsComponent clearSelection (golden WU)", () => {
  it("resets selected set and clears bulkError", () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).selected = new Set(["p1"]);
    let err: any = "x";
    (cmp as any).bulkError = { set: (v: any) => { err = v; } };
    cmp.clearSelection();
    expect((cmp as any).selected.size).toBe(0);
    expect(err).toBeNull();
  });
});
