import { AdminProductsComponent } from "./admin-products.component";

/** Golden WU products-normalize-translation-diff — normalizeTranslationDiff. */
describe("AdminProductsComponent normalizeTranslationDiff (golden WU)", () => {
  function createCmp() {
    return Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
  }

  it("collapses whitespace and trims", () => {
    const cmp = createCmp();
    const fn = (AdminProductsComponent.prototype as any).normalizeTranslationDiff as (
      this: AdminProductsComponent,
      value: string,
    ) => string;
    expect(fn.call(cmp, "  hello   world  ")).toBe("hello world");
    expect(fn.call(cmp, "")).toBe("");
    expect(fn.call(cmp, "a\n\tb")).toBe("a b");
  });
});
