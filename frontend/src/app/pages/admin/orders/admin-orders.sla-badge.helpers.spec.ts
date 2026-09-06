import { AdminOrdersComponent } from "./admin-orders.component";

describe("AdminOrdersComponent slaBadge (golden WU)", () => {
  function bare(): AdminOrdersComponent {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    (cmp as any).translate = { instant: (k: string, _p?: unknown) => k };
    (cmp as any).formatDurationShort = (ms: number) => `${Math.round(ms / 60000)}m`;
    return cmp;
  }

  it("returns null without kind/due; overdue/dueSoon/ok badges otherwise", () => {
    const cmp = bare();
    expect(cmp.slaBadge({} as any)).toBeNull();
    expect(cmp.slaBadge({ sla_kind: "accept" } as any)).toBeNull();

    const overdue = cmp.slaBadge({
      sla_kind: "accept",
      sla_due_at: "2000-01-01T00:00:00Z",
    } as any)!;
    expect(overdue.className).toContain("rose");
    expect(overdue.label).toContain("overdue");

    const dueSoon = cmp.slaBadge({
      sla_kind: "ship",
      sla_due_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    } as any)!;
    expect(dueSoon.className).toContain("amber");

    const ok = cmp.slaBadge({
      sla_kind: "ship",
      sla_due_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    } as any)!;
    expect(ok.className).toContain("emerald");
  });
});
