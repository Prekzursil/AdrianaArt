import { AdminOrderDetailComponent } from "./admin-order-detail.component";

describe("AdminOrderDetailComponent fraudSeverityLabel (golden WU)", () => {
  function bare(instant: (k: string) => string): AdminOrderDetailComponent {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).translate = { instant };
    return cmp;
  }

  it("translates severity or returns raw", () => {
    const cmp = bare((k) => (k.endsWith(".high") ? "High" : k));
    expect(cmp.fraudSeverityLabel("high" as any)).toBe("High");
    expect(cmp.fraudSeverityLabel("custom" as any)).toBe("custom");
  });
});
