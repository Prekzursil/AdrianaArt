import { ProductCardComponent } from './product-card.component';

/** Golden WU product-card-active-product-badge — activeProductBadge. */
describe('ProductCardComponent activeProductBadge (golden WU)', () => {
  it('returns null without badges and prioritizes limited/new/handmade', () => {
    const cmp = Object.create(ProductCardComponent.prototype) as ProductCardComponent;
    Object.assign(cmp as any, { product: { badges: [] } });
    expect(cmp.activeProductBadge()).toBeNull();
    Object.assign(cmp as any, {
      product: { badges: [{ badge: 'handmade' }, { badge: 'new' }, { badge: 'limited' }] },
    });
    expect(cmp.activeProductBadge()).toBe('limited');
    Object.assign(cmp as any, { product: { badges: [{ badge: 'seasonal' }] } });
    expect(cmp.activeProductBadge()).toBe('seasonal');
  });
});
