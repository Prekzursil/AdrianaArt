import { HomeComponent } from './home.component';

describe('HomeComponent normalizeHomeSectionId (golden WU)', () => {
  it('normalizes aliases and casing to HomeSectionId', () => {
    const cmp = Object.create(HomeComponent.prototype) as any;
    expect(cmp.normalizeHomeSectionId('featured_products')).toBe('featured_products');
    expect(cmp.normalizeHomeSectionId('FeaturedProducts')).toBe('featured_products');
    expect(cmp.normalizeHomeSectionId('collections')).toBe('featured_collections');
    expect(cmp.normalizeHomeSectionId('featured')).toBe('featured_products');
    expect(cmp.normalizeHomeSectionId('sale')).toBe('sale_products');
    expect(cmp.normalizeHomeSectionId('')).toBeNull();
    expect(cmp.normalizeHomeSectionId(null)).toBeNull();
  });
});
