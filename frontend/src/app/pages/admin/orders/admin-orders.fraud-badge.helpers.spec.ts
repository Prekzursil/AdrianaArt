import { AdminOrdersComponent } from "./admin-orders.component";

describe("AdminOrdersComponent fraudBadge (golden WU)", () => {
  function bare(): AdminOrdersComponent {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    (cmp as any).translate = { instant: (k: string) => k };
    return cmp;
  }

  it("maps fraud severity to badge classes", () => {
    const cmp = bare();
    expect(cmp.fraudBadge({} as any)).toBeNull();
    expect(cmp.fraudBadge({ fraud_severity: "high" } as any)!.className).toContain("rose");
    expect(cmp.fraudBadge({ fraud_severity: "medium" } as any)!.className).toContain("amber");
    expect(cmp.fraudBadge({ fraud_severity: "low" } as any)!.className).toContain("sky");
    expect(cmp.fraudBadge({ fraud_severity: "other" } as any)!.className).toContain("slate");
  });
});
