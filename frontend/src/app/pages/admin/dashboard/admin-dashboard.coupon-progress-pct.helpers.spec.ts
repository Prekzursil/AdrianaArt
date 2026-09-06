import { AdminDashboardComponent } from "./admin-dashboard.component";

describe("AdminDashboardComponent couponProgressPct (golden WU)", () => {
  function bare(): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).progressPct = AdminDashboardComponent.prototype.progressPct;
    return cmp;
  }

  it("computes clamped percent from job counters", () => {
    const cmp = bare();
    expect(cmp.couponProgressPct({ processed: 0, total_candidates: 0 } as any)).toBe(0);
    expect(cmp.couponProgressPct({ processed: 25, total_candidates: 100 } as any)).toBe(25);
    expect(cmp.couponProgressPct({ processed: 150, total_candidates: 100 } as any)).toBe(100);
  });
});
