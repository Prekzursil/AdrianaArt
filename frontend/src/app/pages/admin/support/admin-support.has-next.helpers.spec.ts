import { AdminSupportComponent } from "./admin-support.component";

/** Golden WU admin-support-has-next — hasNext. */
describe("AdminSupportComponent hasNext (golden WU)", () => {
  it("compares meta.page to meta.total_pages", () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    (cmp as any).meta = () => ({ page: 1, total_pages: 3 });
    expect(cmp.hasNext()).toBe(true);
    (cmp as any).meta = () => ({ page: 3, total_pages: 3 });
    expect(cmp.hasNext()).toBe(false);
  });
});
