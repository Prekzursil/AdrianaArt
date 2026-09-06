import { AdminOrderDetailComponent } from "./admin-order-detail.component";

/** Golden WU order-detail-normalize-country — normalizeCountry. */
describe("AdminOrderDetailComponent normalizeCountry (golden WU)", () => {
  function createCmp() {
    return Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
  }

  it("trims and uppercases country codes", () => {
    const cmp = createCmp();
    const fn = (AdminOrderDetailComponent.prototype as any).normalizeCountry as (
      this: AdminOrderDetailComponent,
      country: string | null | undefined,
    ) => string;
    expect(fn.call(cmp, " ro ")).toBe("RO");
    expect(fn.call(cmp, null)).toBe("");
    expect(fn.call(cmp, undefined)).toBe("");
    expect(fn.call(cmp, "Us")).toBe("US");
  });
});
