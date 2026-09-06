import { CartComponent } from './cart.component';
import type { Product } from '../../core/catalog.service';

/** Golden WU — suggestedAddOns / freeShippingAppliedByCoupon. */
describe('CartComponent suggestedAddOns / freeShippingAppliedByCoupon (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): CartComponent {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      recommendations: [] as Product[],
      freeShippingRemaining: () => 50 as number | null,
      displayProductPrice: (p: Product) => (p as any).base_price ?? 0,
      couponShippingDiscount: () => 0,
      ...overrides,
    });
    return cmp;
  }

  const product = (id: string, price: number): Product =>
    ({ id, slug: id, base_price: price }) as Product;

  it('suggestedAddOns empty when remaining null/0', () => {
    expect(bare({ freeShippingRemaining: () => null }).suggestedAddOns()).toEqual([]);
    expect(bare({ freeShippingRemaining: () => 0 }).suggestedAddOns()).toEqual([]);
  });

  it('suggestedAddOns prefers items under remaining, else cheapest 2', () => {
    const recs = [product('a', 80), product('b', 20), product('c', 40)];
    const under = bare({ recommendations: recs, freeShippingRemaining: () => 50 }).suggestedAddOns();
    expect(under.map((p) => p.id)).toEqual(['b', 'c']);

    const fallback = bare({
      recommendations: recs,
      freeShippingRemaining: () => 10,
    }).suggestedAddOns();
    expect(fallback.map((p) => p.id)).toEqual(['b', 'c']);
  });

  it('freeShippingAppliedByCoupon mirrors couponShippingDiscount > 0', () => {
    expect(bare().freeShippingAppliedByCoupon()).toBe(false);
    expect(bare({ couponShippingDiscount: () => 5 }).freeShippingAppliedByCoupon()).toBe(true);
  });
});
