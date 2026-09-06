import { AdminOrderDetailComponent } from "./admin-order-detail.component";

describe("AdminOrderDetailComponent fraudSeverityDotClass (golden WU)", () => {
  function bare(): AdminOrderDetailComponent {
    return Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
  }

  it("maps severity to dot color", () => {
    const cmp = bare();
    expect(cmp.fraudSeverityDotClass("high" as any)).toBe("bg-rose-500");
    expect(cmp.fraudSeverityDotClass("medium" as any)).toBe("bg-amber-500");
    expect(cmp.fraudSeverityDotClass("low" as any)).toBe("bg-sky-500");
    expect(cmp.fraudSeverityDotClass("unknown" as any)).toBe("bg-slate-400");
  });
});
