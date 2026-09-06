import { AdminCouponsComponent } from "./admin-coupons.component";

/** Golden WU admin-coupons-ab-can-run — abCanRun. */
describe("AdminCouponsComponent abCanRun (golden WU)", () => {
  it("requires selected assigned coupon A; B optional but must be assigned if set", () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    (cmp as any).selectedCoupon = () => null;
    (cmp as any).abCouponB = () => null;
    expect(cmp.abCanRun()).toBe(false);
    (cmp as any).selectedCoupon = () => ({ visibility: "public" });
    expect(cmp.abCanRun()).toBe(false);
    (cmp as any).selectedCoupon = () => ({ visibility: "assigned" });
    (cmp as any).abCouponB = () => null;
    expect(cmp.abCanRun()).toBe(true);
    (cmp as any).abCouponB = () => ({ visibility: "public" });
    expect(cmp.abCanRun()).toBe(false);
    (cmp as any).abCouponB = () => ({ visibility: "assigned" });
    expect(cmp.abCanRun()).toBe(true);
  });
});
