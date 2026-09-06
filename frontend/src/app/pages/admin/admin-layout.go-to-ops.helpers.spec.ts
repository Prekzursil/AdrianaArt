import { AdminLayoutComponent } from "./admin-layout.component";

/** Golden WU admin-layout-go-to-ops — goToOps. */
describe("AdminLayoutComponent goToOps (golden WU)", () => {
  it("navigates to /admin/ops with focus state", () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    const calls: Array<{ url: string; extras: any }> = [];
    (cmp as any).router = {
      navigateByUrl: (url: string, extras?: any) => {
        calls.push({ url, extras });
        return Promise.resolve(true);
      },
    };
    cmp.goToOps("webhooks");
    expect(calls[0].url).toBe("/admin/ops");
    expect(calls[0].extras).toEqual({ state: { focusOpsSection: "webhooks" } });
  });
});
