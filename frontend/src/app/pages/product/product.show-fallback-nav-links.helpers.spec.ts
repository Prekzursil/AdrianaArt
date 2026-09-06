import { ProductComponent } from './product.component';

/** Golden WU product-show-fallback-nav-links — showFallbackNavigationLinks. */
describe('ProductComponent showFallbackNavigationLinks (golden WU)', () => {
  it('is true only when upsell/related/recentlyViewed are all empty', () => {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).upsellProducts = [];
    (cmp as any).relatedProducts = [];
    (cmp as any).recentlyViewed = [];
    expect(cmp.showFallbackNavigationLinks()).toBe(true);
    (cmp as any).upsellProducts = [{ id: 1 }];
    expect(cmp.showFallbackNavigationLinks()).toBe(false);
    (cmp as any).upsellProducts = [];
    (cmp as any).relatedProducts = [{ id: 2 }];
    expect(cmp.showFallbackNavigationLinks()).toBe(false);
    (cmp as any).relatedProducts = [];
    (cmp as any).recentlyViewed = [{ id: 3 }];
    expect(cmp.showFallbackNavigationLinks()).toBe(false);
  });
});
