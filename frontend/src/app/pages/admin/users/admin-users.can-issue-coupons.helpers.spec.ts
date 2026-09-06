import { AdminUsersComponent } from "./admin-users.component";

/** Golden WU admin-users-can-issue-coupons — canIssueCoupons. */
describe("AdminUsersComponent canIssueCoupons (golden WU)", () => {
  it("requires coupons section access", () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    (cmp as any).auth = { canAccessAdminSection: (s: string) => s === "coupons" };
    expect(cmp.canIssueCoupons()).toBe(true);
    (cmp as any).auth = { canAccessAdminSection: () => false };
    expect(cmp.canIssueCoupons()).toBe(false);
  });
});
