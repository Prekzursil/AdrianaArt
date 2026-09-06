import { AdminDashboardComponent } from "./admin-dashboard.component";

describe("AdminDashboardComponent salesDeltaPct (golden WU)", () => {
  function bare(summary: any, metric: string): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).summary = () => summary;
    (cmp as any).salesMetric = () => metric;
    return cmp;
  }

  it("picks gross or net delta pct from summary", () => {
    expect(bare(null, "gross").salesDeltaPct()).toBeNull();
    expect(
      bare({ gross_sales_delta_pct: 12.5, net_sales_delta_pct: -3 }, "gross").salesDeltaPct(),
    ).toBe(12.5);
    expect(
      bare({ gross_sales_delta_pct: 12.5, net_sales_delta_pct: -3 }, "net").salesDeltaPct(),
    ).toBe(-3);
  });
});
