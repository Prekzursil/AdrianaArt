import { AdminOrderDetailComponent } from "./admin-order-detail.component";

describe("AdminOrderDetailComponent emailStatusLabel (golden WU)", () => {
  function bare(instant: (k: string) => string): AdminOrderDetailComponent {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).translate = { instant };
    return cmp;
  }

  it("returns translation or raw status", () => {
    const cmp = bare((k) => (k.endsWith(".sent") ? "Sent" : k));
    expect(cmp.emailStatusLabel("sent")).toBe("Sent");
    expect(cmp.emailStatusLabel("Weird")).toBe("Weird");
  });
});
