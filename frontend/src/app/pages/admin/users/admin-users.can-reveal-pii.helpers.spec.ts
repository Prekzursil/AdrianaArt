import { AdminUsersComponent } from "./admin-users.component";

/** Golden WU admin-users-can-reveal-pii — canRevealPii. */
describe("AdminUsersComponent canRevealPii (golden WU)", () => {
  it("allows owner/admin/support/fulfillment", () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    for (const role of ["owner", "admin", "support", "fulfillment"]) {
      (cmp as any).auth = { role: () => role };
      expect(cmp.canRevealPii()).withContext(role).toBe(true);
    }
    (cmp as any).auth = { role: () => "viewer" };
    expect(cmp.canRevealPii()).toBe(false);
  });
});
