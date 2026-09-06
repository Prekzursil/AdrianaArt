import { AdminOrderDetailComponent } from "./admin-order-detail.component";

/** Golden WU order-detail-clean-phone — cleanPhoneValue. */
describe("AdminOrderDetailComponent cleanPhoneValue (golden WU)", () => {
  function createCmp() {
    return Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
  }

  it("normalizes plus/00 and strips punctuation", () => {
    const cmp = createCmp();
    const fn = (AdminOrderDetailComponent.prototype as any).cleanPhoneValue as (
      this: AdminOrderDetailComponent,
      phone: string | null | undefined,
    ) => string;
    expect(fn.call(cmp, null)).toBe("");
    expect(fn.call(cmp, "  ")).toBe("");
    expect(fn.call(cmp, "00 40 (721) 123-456")).toBe("+40721123456");
    expect(fn.call(cmp, "+40 721-123.456")).toBe("+40721123456");
    expect(fn.call(cmp, "0721-123.456")).toBe("0721123456");
  });
});
