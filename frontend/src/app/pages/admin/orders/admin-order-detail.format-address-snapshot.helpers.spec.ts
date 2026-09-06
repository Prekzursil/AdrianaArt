import { AdminOrderDetailComponent } from "./admin-order-detail.component";

describe("AdminOrderDetailComponent formatAddressSnapshot (golden WU)", () => {
  function bare(): AdminOrderDetailComponent {
    return Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
  }

  it("formats address lines or em dash", () => {
    const cmp = bare();
    expect(cmp.formatAddressSnapshot(null)).toBe("—");
    expect(cmp.formatAddressSnapshot([])).toBe("—");
    expect(
      cmp.formatAddressSnapshot({
        label: "Home",
        line1: "1 Main",
        city: "Cluj",
        postal_code: "400000",
        country: "RO",
      }),
    ).toBe("Home\n1 Main\nCluj 400000\nRO");
  });
});
