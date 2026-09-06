import { AdminProductsComponent } from "./admin-products.component";

describe("AdminProductsComponent hasUnsavedChanges (golden WU)", () => {
  function bare(open: boolean, dirty: boolean): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).editorOpen = () => open;
    (cmp as any).editorDirty = () => dirty;
    return cmp;
  }

  it("requires editor open and dirty", () => {
    expect(bare(true, true).hasUnsavedChanges()).toBe(true);
    expect(bare(true, false).hasUnsavedChanges()).toBe(false);
    expect(bare(false, true).hasUnsavedChanges()).toBe(false);
  });
});
