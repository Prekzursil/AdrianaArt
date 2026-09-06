import { AdminUsersComponent } from "./admin-users.component";

/** Golden WU admin-users-can-manage-roles — canManageRoles. */
describe("AdminUsersComponent canManageRoles (golden WU)", () => {
  it("delegates to auth.isAdmin", () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    (cmp as any).auth = { isAdmin: () => true };
    expect(cmp.canManageRoles()).toBe(true);
    (cmp as any).auth = { isAdmin: () => false };
    expect(cmp.canManageRoles()).toBe(false);
  });
});
