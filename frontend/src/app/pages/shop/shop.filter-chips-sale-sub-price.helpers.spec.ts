import { ShopComponent } from './shop.component';

/** Golden WU shop-filter-chips-sale-sub-price — filterChips sale/sub/price (#727 sidecar). */
describe('ShopComponent filterChips sale/sub/price helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).activeCategorySlug = '';
    (cmp as any).activeSubcategorySlug = '';
    (cmp as any).categoriesBySlug = new Map([
      ['mugs', { name: 'Mugs' }],
      ['stoneware', { name: 'Stoneware' }],
    ]);
    (cmp as any).priceMinBound = 0;
    (cmp as any).priceMaxBound = 1000;
    (cmp as any).filters = {
      min_price: 0,
      max_price: 1000,
      search: '',
      tags: new Set(),
    };
    (cmp as any).allTags = [];
    (cmp as any).translate = { instant: (key: string, params?: any) => (params ? `${key}:${JSON.stringify(params)}` : key) };
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('emits sale category chip when activeCategorySlug is sale', () => {
    const chips = createCmp({ activeCategorySlug: 'sale' }).filterChips();
    expect(chips).toEqual([
      { id: 'category:sale', type: 'category', label: 'shop.sale' },
    ]);
  });

  it('emits subcategory chip from categoriesBySlug (fallback to slug)', () => {
    const withName = createCmp({
      activeCategorySlug: 'mugs',
      activeSubcategorySlug: 'stoneware',
    }).filterChips();
    expect(withName.some((c) => c.id === 'subcategory:stoneware' && c.label === 'Stoneware')).toBe(
      true,
    );

    const fallback = createCmp({
      activeCategorySlug: 'mugs',
      activeSubcategorySlug: 'missing',
    }).filterChips();
    expect(fallback.some((c) => c.id === 'subcategory:missing' && c.label === 'missing')).toBe(true);
  });

  it('emits price chip when min/max leave the bounds', () => {
    const chips = createCmp({
      filters: { min_price: 10, max_price: 50, search: '', tags: new Set() },
    }).filterChips();
    expect(chips).toEqual([
      {
        id: 'price:10-50',
        type: 'price',
        label: 'shop.priceChip:{"min":10,"max":50}',
      },
    ]);
  });
});
