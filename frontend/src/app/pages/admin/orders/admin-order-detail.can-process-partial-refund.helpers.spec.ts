import { AdminOrderDetailComponent } from "./admin-order-detail.component";

describe("AdminOrderDetailComponent canProcessPartialRefund (golden WU)", () => {
  function bare(order: any): AdminOrderDetailComponent {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).order = () => order;
    return cmp;
  }

  it("requires capture ids for stripe/paypal", () => {
    expect(bare(null).canProcessPartialRefund()).toBe(false);
    expect(bare({ payment_method: "stripe" }).canProcessPartialRefund()).toBe(false);
    expect(
      bare({ payment_method: "stripe", stripe_payment_intent_id: "pi_1" }).canProcessPartialRefund(),
    ).toBe(true);
    expect(
      bare({ payment_method: "paypal", paypal_capture_id: "cap_1" }).canProcessPartialRefund(),
    ).toBe(true);
    expect(bare({ payment_method: "cod" }).canProcessPartialRefund()).toBe(false);
  });
});
