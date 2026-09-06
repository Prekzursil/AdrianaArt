import { AdminOrderDetailComponent } from "./admin-order-detail.component";

/** Golden WU admin-order-is-test-order — isTestOrder. */
describe("AdminOrderDetailComponent isTestOrder (golden WU)", () => {
  it("true when tags include test", () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).order = () => ({ tags: ["vip", "test"] });
    expect(cmp.isTestOrder()).toBe(true);
    (cmp as any).order = () => ({ tags: ["vip"] });
    expect(cmp.isTestOrder()).toBe(false);
    (cmp as any).order = () => ({ tags: null });
    expect(cmp.isTestOrder()).toBe(false);
  });
});
