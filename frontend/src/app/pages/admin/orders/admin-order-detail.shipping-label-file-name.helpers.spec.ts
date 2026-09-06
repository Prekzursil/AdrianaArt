import { AdminOrderDetailComponent } from "./admin-order-detail.component";

describe("AdminOrderDetailComponent shippingLabelFileName (golden WU)", () => {
  function bare(file: File | null, instant: (k: string) => string = (k) => "No file"): AdminOrderDetailComponent {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).shippingLabelFile = file;
    (cmp as any).translate = { instant };
    return cmp;
  }

  it("returns file name or translated empty label", () => {
    expect(bare(null).shippingLabelFileName()).toBe("No file");
    expect(bare(new File(["x"], "label.pdf")).shippingLabelFileName()).toBe("label.pdf");
  });
});
