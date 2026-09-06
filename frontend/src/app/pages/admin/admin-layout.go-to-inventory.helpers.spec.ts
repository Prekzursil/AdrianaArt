import { AdminLayoutComponent } from "./admin-layout.component";

/** Golden WU admin-layout-go-to-inventory — goToInventory. */
describe("AdminLayoutComponent goToInventory (golden WU)", () => {
  it("navigates to /admin/inventory", () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    const calls: string[] = [];
    (cmp as any).router = { navigateByUrl: (url: string) => { calls.push(url); return Promise.resolve(true); } };
    cmp.goToInventory();
    expect(calls).toEqual(["/admin/inventory"]);
  });
});
