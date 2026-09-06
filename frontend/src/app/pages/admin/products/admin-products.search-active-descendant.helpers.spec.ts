import { AdminProductsComponent } from "./admin-products.component";

describe("AdminProductsComponent productSearchActiveDescendant (golden WU)", () => {
  function bare(open: boolean, idx: number, results: unknown[]): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).productSearchOpen = () => open;
    (cmp as any).productSearchActiveIndex = () => idx;
    (cmp as any).productSearchResults = () => results;
    return cmp;
  }

  it("returns option id only when open with in-range index", () => {
    expect(bare(false, 0, [{} id: 1 }]).productSearchActiveDescendant()).toBeNull();
    expect(bare(true, -1, [{ id: 1 }]).productSearchActiveDescendant()).toBeNull();
    expect(bare(true, 1, [{ id: 1 }]).productSearchActiveDescendant()).toBeNull();
    expect(bare(true, 0, [{ id: 1 }]).productSearchActiveDescendant()).toBe(
      "admin-products-search-option-0",
    );
  });
});
