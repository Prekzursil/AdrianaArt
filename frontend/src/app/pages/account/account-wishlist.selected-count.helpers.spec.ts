import { AccountWishlistComponent } from "./account-wishlist.component";

/** Golden WU account-wishlist-selected-count — selectedCount. */
describe("AccountWishlistComponent selectedCount (golden WU)", () => {
  it("returns selected.size", () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    (cmp as any).selected = new Set(["a", "b"]);
    expect(cmp.selectedCount()).toBe(2);
  });
});
