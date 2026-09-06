import { AdminLayoutComponent } from "./admin-layout.component";

/** Golden WU admin-layout-refresh-alerts — refreshAlerts. */
describe("AdminLayoutComponent refreshAlerts (golden WU)", () => {
  it("calls loadAlerts", () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    let n = 0;
    (cmp as any).loadAlerts = () => { n += 1; };
    cmp.refreshAlerts();
    expect(n).toBe(1);
  });
});
