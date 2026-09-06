import { AdminUsersComponent } from "./admin-users.component";

/** Golden WU admin-users-is-locked — isLocked. */
describe("AdminUsersComponent isLocked (golden WU)", () => {
  it("true when locked_until is a future timestamp", () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    (cmp as any).profile = () => ({ user: { locked_until: null } });
    expect(cmp.isLocked()).toBe(false);
    const future = new Date(Date.now() + 60_000).toISOString();
    const past = new Date(Date.now() - 60_000).toISOString();
    (cmp as any).profile = () => ({ user: { locked_until: future } });
    expect(cmp.isLocked()).toBe(true);
    (cmp as any).profile = () => ({ user: { locked_until: past } });
    expect(cmp.isLocked()).toBe(false);
    (cmp as any).profile = () => ({ user: { locked_until: "nope" } });
    expect(cmp.isLocked()).toBe(false);
  });
});
