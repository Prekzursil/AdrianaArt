import { ShopComponent } from './shop.component';

describe('ShopComponent resetFilters (golden WU)', () => {
  it('clears filters to defaults and reloads products', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      cancelFilterDebounce: jasmine.createSpy('cancelFilterDebounce'),
      loadProducts: jasmine.createSpy('loadProducts'),
      priceMinBound: 10,
      priceMaxBound: 200,
      filters: {
        search: 'q',
        min_price: 50,
        max_price: 90,
        tags: new Set(['a']),
        sort: 'price_asc',
        page: 3,
      },
      activeCategorySlug: 'cat',
      activeSubcategorySlug: 'sub',
      categorySelection: 'cat/sub',
    });
    cmp.resetFilters();
    expect((cmp as any).cancelFilterDebounce).toHaveBeenCalled();
    expect(cmp.filters.search).toBe('');
    expect(cmp.activeCategorySlug).toBe('');
    expect(cmp.activeSubcategorySlug).toBe('');
    expect(cmp.categorySelection).toBe('');
    expect(cmp.filters.min_price).toBe(10);
    expect(cmp.filters.max_price).toBe(200);
    expect(cmp.filters.tags.size).toBe(0);
    expect(cmp.filters.sort).toBe('newest');
    expect(cmp.filters.page).toBe(1);
    expect((cmp as any).loadProducts).toHaveBeenCalled();
  });
});
