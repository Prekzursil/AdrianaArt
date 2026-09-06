import { AdminUsersComponent } from "./admin-users.component";

/** Golden WU admin-users-is-current-view-pinned — isCurrentViewPinned. */
describe("AdminUsersComponent isCurrentViewPinned (golden WU)", () => {
  it("delegates to favorites.isFavorite(currentViewFavoriteKey())", () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    (cmp as any).currentViewFavoriteKey = () => "users:active";
    (cmp as any).favorites = { isFavorite: (k: string) => k === "users:active" };
    expect(cmp.isCurrentViewPinned()).toBe(true);
    (cmp as any).favorites = { isFavorite: () => false };
    expect(cmp.isCurrentViewPinned()).toBe(false);
  });
});
