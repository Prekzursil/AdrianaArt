import { CheckoutComponent } from "./checkout.component";

/** Golden WU checkout-analytics-opt-in — analyticsOptIn. */
describe("CheckoutComponent analyticsOptIn (golden WU)", () => {
  it("mirrors analytics.enabled()", () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).analytics = { enabled: () => true };
    expect(cmp.analyticsOptIn).toBe(true);
    (cmp as any).analytics = { enabled: () => false };
    expect(cmp.analyticsOptIn).toBe(false);
  });
});
