import { AdminProductsComponent } from "./admin-products.component";

/** Golden WU admin-products-is-current-view-pinned — isCurrentViewPinned. */
describe("AdminProductsComponent isCurrentViewPinned (golden WU)", () => {
  it("delegates to favorites.isFavorite(currentViewFavoriteKey())", () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).currentViewFavoriteKey = () => "products:draft";
    (cmp as any).favorites = { isFavorite: (k: string) => k === "products:draft" };
    expect(cmp.isCurrentViewPinned()).toBe(true);
    (cmp as any).favorites = { isFavorite: () => false };
    expect(cmp.isCurrentViewPinned()).toBe(false);
  });
});
