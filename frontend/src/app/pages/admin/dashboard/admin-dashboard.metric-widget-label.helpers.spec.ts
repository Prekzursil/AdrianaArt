import { AdminDashboardComponent } from "./admin-dashboard.component";

describe("AdminDashboardComponent metricWidgetLabel (golden WU)", () => {
  function bare(instant: (k: string) => string): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).translate = { instant };
    return cmp;
  }

  it("maps widget ids to translation keys", () => {
    const cmp = bare((k) => k.split(".").pop()!);
    expect(cmp.metricWidgetLabel("kpis" as any)).toBe("kpis");
    expect(cmp.metricWidgetLabel("counts" as any)).toBe("counts");
    expect(cmp.metricWidgetLabel("range" as any)).toBe("range");
  });
});
