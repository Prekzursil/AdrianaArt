import { CartComponent } from './cart.component';

/** Golden WU cart-free-shipping-progress-pct — freeShippingProgressPct. */
describe('CartComponent freeShippingProgressPct (golden WU)', () => {
  function bare(threshold: number | null, subtotal: number, discount: number): CartComponent {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      freeShippingThreshold: () => threshold,
      quoteSubtotal: () => subtotal,
      quoteDiscount: () => discount,
    });
    return cmp;
  }

  it('clamps progress from taxable subtotal over threshold', () => {
    expect(bare(null, 50, 0).freeShippingProgressPct()).toBe(0);
    expect(bare(0, 50, 0).freeShippingProgressPct()).toBe(100);
    expect(bare(100, 50, 0).freeShippingProgressPct()).toBe(50);
    expect(bare(100, 200, 0).freeShippingProgressPct()).toBe(100);
    expect(bare(100, 80, 30).freeShippingProgressPct()).toBe(50);
  });
});
