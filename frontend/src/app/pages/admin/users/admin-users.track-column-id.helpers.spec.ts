import { AdminUsersComponent } from "./admin-users.component";

/** Golden WU admin-users-track-column-id — trackColumnId. */
describe("AdminUsersComponent trackColumnId (golden WU)", () => {
  it("returns colId", () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    expect(cmp.trackColumnId(3, "email")).toBe("email");
  });
});
