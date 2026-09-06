import { AdminUsersComponent } from "./admin-users.component";

/** Golden WU admin-users-track-user-id — trackUserId. */
describe("AdminUsersComponent trackUserId (golden WU)", () => {
  it("returns user.id", () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    expect(cmp.trackUserId(0, { id: "u1" } as any)).toBe("u1");
  });
});
