import { HomeComponent } from './home.component';

/** Golden WU home-section-id — isHomeSectionId / normalizeHomeSectionId. */
describe('HomeComponent section id helpers (golden WU)', () => {
  function createCmp() {
    return Object.create(HomeComponent.prototype) as HomeComponent;
  }

  it('isHomeSectionId accepts known ids only', () => {
    const cmp = createCmp() as any;
    expect(cmp.isHomeSectionId('featured_products')).toBe(true);
    expect(cmp.isHomeSectionId('why')).toBe(true);
    expect(cmp.isHomeSectionId('nope')).toBe(false);
    expect(cmp.isHomeSectionId(1)).toBe(false);
  });

  it('normalizeHomeSectionId returns canonical ids and aliases', () => {
    const cmp = createCmp() as any;
    expect(cmp.normalizeHomeSectionId('sale_products')).toBe('sale_products');
    expect(cmp.normalizeHomeSectionId('  NewArrivals ')).toBe('new_arrivals');
    expect(cmp.normalizeHomeSectionId('collections')).toBe('featured_collections');
    expect(cmp.normalizeHomeSectionId('featured')).toBe('featured_products');
    expect(cmp.normalizeHomeSectionId('bestsellers')).toBe('featured_products');
    expect(cmp.normalizeHomeSectionId('sale')).toBe('sale_products');
    expect(cmp.normalizeHomeSectionId('recentlyviewed')).toBe('recently_viewed');
  });

  it('normalizeHomeSectionId rejects empty/unknown', () => {
    const cmp = createCmp() as any;
    expect(cmp.normalizeHomeSectionId('')).toBeNull();
    expect(cmp.normalizeHomeSectionId('   ')).toBeNull();
    expect(cmp.normalizeHomeSectionId(null)).toBeNull();
    expect(cmp.normalizeHomeSectionId('unknown_section')).toBeNull();
  });
});
