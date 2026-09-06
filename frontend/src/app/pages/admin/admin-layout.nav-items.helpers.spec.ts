import { AdminLayoutComponent } from "./admin-layout.component";

/** Golden WU admin-layout-nav-items — navItems. */
describe("AdminLayoutComponent navItems (golden WU)", () => {
  it("filters allNavItems by auth.canAccessAdminSection", () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    (cmp as any).allNavItems = [
      { section: "orders", path: "/admin/orders" },
      { section: "users", path: "/admin/users" },
    ];
    (cmp as any).auth = { canAccessAdminSection: (s: string) => s === "orders" };
    expect(cmp.navItems.map((i: any) => i.section)).toEqual(["orders"]);
  });
});
