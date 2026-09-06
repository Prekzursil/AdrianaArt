import { ShopComponent } from "./shop.component";

/** Golden WU shop-cancel-filter-debounce — cancelFilterDebounce. */
describe("ShopComponent cancelFilterDebounce (golden WU)", () => {
  it("clears pending timeout when set", () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    const handle = setTimeout(() => {}, 60_000);
    (cmp as any).filterDebounce = handle;
    (cmp as any).cancelFilterDebounce();
    expect((cmp as any).filterDebounce).toBeUndefined();
  });
});
