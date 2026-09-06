import { AdminOrderDetailComponent } from "./admin-order-detail.component";

describe("AdminOrderDetailComponent shippingLabelEventLabel (golden WU)", () => {
  function bare(): AdminOrderDetailComponent {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).translate = { instant: (k: string) => k.split(".").pop()! };
    return cmp;
  }

  it("maps known shipping label events", () => {
    const cmp = bare();
    expect(cmp.shippingLabelEventLabel("shipping_label_uploaded")).toBe("uploaded");
    expect(cmp.shippingLabelEventLabel("shipping_label_downloaded")).toBe("downloaded");
    expect(cmp.shippingLabelEventLabel("shipping_label_printed")).toBe("printed");
    expect(cmp.shippingLabelEventLabel("shipping_label_deleted")).toBe("deleted");
    expect(cmp.shippingLabelEventLabel("other_event")).toBe("other_event");
  });
});
