import { AdminUsersComponent } from "./admin-users.component";

describe("AdminUsersComponent currentViewFavoriteKey (golden WU)", () => {
  function bare(filters: unknown): AdminUsersComponent {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    (cmp as any).currentViewFilters = () => filters;
    return cmp;
  }

  it("builds favorite key via adminFilterFavoriteKey", () => {
    const key = bare({ q: "a" }).currentViewFavoriteKey();
    expect(typeof key).toBe("string");
    expect(key.length).toBeGreaterThan(0);
    expect(key).toContain("users");
  });
});
