import { AdminUsersComponent } from "./admin-users.component";

/** Golden WU admin-users-is-owner — isOwner. */
describe("AdminUsersComponent isOwner (golden WU)", () => {
  it("true only for owner role", () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    (cmp as any).auth = { role: () => "owner" };
    expect(cmp.isOwner()).toBe(true);
    (cmp as any).auth = { role: () => "admin" };
    expect(cmp.isOwner()).toBe(false);
  });
});
