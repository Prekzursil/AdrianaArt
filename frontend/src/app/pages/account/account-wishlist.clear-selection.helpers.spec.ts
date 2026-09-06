import { AccountWishlistComponent } from "./account-wishlist.component";

/** Golden WU account-wishlist-clear-selection — clearSelection. */
describe("AccountWishlistComponent clearSelection (golden WU)", () => {
  it("clears selected set", () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    (cmp as any).selected = new Set(["a"]);
    cmp.clearSelection();
    expect((cmp as any).selected.size).toBe(0);
  });
});
