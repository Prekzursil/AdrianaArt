import { ShopComponent } from "./shop.component";

/** Golden WU shop-can-save-rename — canSaveRename. */
describe("ShopComponent canSaveRename (golden WU)", () => {
  it("requires both names and idle rename flags", () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).renameLoading = false;
    (cmp as any).renameSaving = false;
    (cmp as any).renameNameRo = "  ro  ";
    (cmp as any).renameNameEn = " en ";
    expect(cmp.canSaveRename()).toBe(true);
    (cmp as any).renameNameEn = " ";
    expect(cmp.canSaveRename()).toBe(false);
    (cmp as any).renameNameEn = "en";
    (cmp as any).renameSaving = true;
    expect(cmp.canSaveRename()).toBe(false);
  });
});
