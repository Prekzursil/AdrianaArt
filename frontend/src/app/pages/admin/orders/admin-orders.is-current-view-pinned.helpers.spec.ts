import { AdminOrdersComponent } from "./admin-orders.component";

/** Golden WU admin-orders-is-current-view-pinned — isCurrentViewPinned. */
describe("AdminOrdersComponent isCurrentViewPinned (golden WU)", () => {
  it("delegates to favorites.isFavorite(currentViewFavoriteKey())", () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    (cmp as any).currentViewFavoriteKey = () => "orders:open";
    (cmp as any).favorites = { isFavorite: (k: string) => k === "orders:open" };
    expect(cmp.isCurrentViewPinned()).toBe(true);
    (cmp as any).favorites = { isFavorite: () => false };
    expect(cmp.isCurrentViewPinned()).toBe(false);
  });
});
