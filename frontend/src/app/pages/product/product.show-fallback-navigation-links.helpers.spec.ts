import { ProductComponent } from './product.component';

/** Golden WU show-fallback-navigation-links -- showFallbackNavigationLinks. */
describe('ProductComponent showFallbackNavigationLinks (golden WU)', () => {
  function bare(upsell: unknown[], related: unknown[], recent: unknown[]): ProductComponent {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    Object.assign(cmp as any, {
      upsellProducts: upsell,
      relatedProducts: related,
      recentlyViewed: recent,
    });
    return cmp;
  }

  it('shows fallback links only when all recommendation lists are empty', () => {
    expect(bare([], [], []).showFallbackNavigationLinks()).toBeTrue();
    expect(bare([{}], [], []).showFallbackNavigationLinks()).toBeFalse();
    expect(bare([], [{}], []).showFallbackNavigationLinks()).toBeFalse();
    expect(bare([], [], [{}]).showFallbackNavigationLinks()).toBeFalse();
  });
});
