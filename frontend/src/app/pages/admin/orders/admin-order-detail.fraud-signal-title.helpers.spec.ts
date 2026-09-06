import { AdminOrderDetailComponent } from "./admin-order-detail.component";

describe("AdminOrderDetailComponent fraudSignalTitle (golden WU)", () => {
  function bare(instant: (k: string) => string): AdminOrderDetailComponent {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).translate = { instant };
    return cmp;
  }

  it("translates signal title or falls back to code", () => {
    const cmp = bare((k) => (k.includes(".velocity.title") ? "Velocity" : k));
    expect(cmp.fraudSignalTitle({ code: "velocity" } as any)).toBe("Velocity");
    expect(cmp.fraudSignalTitle({ code: "unknown_x" } as any)).toBe("unknown_x");
  });
});
