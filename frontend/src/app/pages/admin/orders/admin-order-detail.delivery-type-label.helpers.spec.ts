import { AdminOrderDetailComponent } from "./admin-order-detail.component";

describe("AdminOrderDetailComponent deliveryTypeLabel (golden WU)", () => {
  function bare(order: any, instant: (k: string) => string = (k) => k): AdminOrderDetailComponent {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).order = () => order;
    (cmp as any).translate = { instant };
    return cmp;
  }

  it("labels locker/home or falls back", () => {
    expect(bare(null).deliveryTypeLabel()).toBe("—");
    expect(
      bare({ delivery_type: "locker" }, (k) => (k.endsWith("Locker") ? "Locker" : k)).deliveryTypeLabel(),
    ).toBe("Locker");
    expect(
      bare({ delivery_type: "home" }, (k) => (k.endsWith("Home") ? "Home" : k)).deliveryTypeLabel(),
    ).toBe("Home");
    expect(bare({ delivery_type: "drone" }).deliveryTypeLabel()).toBe("drone");
  });
});
