import { AdminDashboardComponent } from "./admin-dashboard.component";

describe("AdminDashboardComponent progressPct (golden WU)", () => {
  function bare(): AdminDashboardComponent {
    return Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
  }

  it("clamps finite percents into 0..100", () => {
    const cmp = bare();
    expect(cmp.progressPct(null)).toBe(0);
    expect(cmp.progressPct("nope")).toBe(0);
    expect(cmp.progressPct(-10)).toBe(0);
    expect(cmp.progressPct(55)).toBe(55);
    expect(cmp.progressPct(150)).toBe(100);
  });
});
