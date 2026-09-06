import { AccountWishlistComponent } from "./account-wishlist.component";

/** Golden WU account-wishlist-all-selected — allSelected. */
describe("AccountWishlistComponent allSelected (golden WU)", () => {
  it("true when non-empty wishlist all in selected", () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    (cmp as any).account = { wishlist: { items: () => [] } };
    (cmp as any).selected = new Set();
    expect(cmp.allSelected()).toBe(false);
    (cmp as any).account = { wishlist: { items: () => [{ id: "a" }, { id: "b" }] } };
    (cmp as any).selected = new Set(["a"]);
    expect(cmp.allSelected()).toBe(false);
    (cmp as any).selected = new Set(["a", "b"]);
    expect(cmp.allSelected()).toBe(true);
  });
});
