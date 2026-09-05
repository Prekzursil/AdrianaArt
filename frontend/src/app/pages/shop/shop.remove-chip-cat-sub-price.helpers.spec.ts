import { ShopComponent } from './shop.component';

/** Golden WU shop-remove-chip-cat-sub-price — removeChip category/sub/price (#719 sidecar). */
describe('ShopComponent removeChip category/sub/price helpers (golden WU)', () => {
  function createCmp(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).filterDebounce = setTimeout(() => undefined, 99999);
    (cmp as any).filters = { page: 4, min_price: 25, max_price: 80, search: 'x', tags: new Set(['t']) };
    (cmp as any).activeCategorySlug = 'mugs';
    (cmp as any).activeSubcategorySlug = 'stoneware';
    (cmp as any).categorySelection = 'mugs';
    (cmp as any).priceMinBound = 0;
    (cmp as any).priceMaxBound = 1000;
    (cmp as any).loadProducts = jasmine.createSpy('loadProducts');
    (cmp as any).applyFilters = jasmine.createSpy('applyFilters');
    return cmp;
  }

  it('category chip clears category tree and reloads', () => {
    const cmp = createCmp();
    cmp.removeChip({ id: 'category:mugs', type: 'category', label: 'Mugs' } as any);
    expect((cmp as any).activeCategorySlug).toBe('');
    expect((cmp as any).activeSubcategorySlug).toBe('');
    expect((cmp as any).categorySelection).toBe('');
    expect((cmp as any).filters.page).toBe(1);
    expect((cmp as any).filterDebounce).toBeUndefined();
    expect((cmp as any).loadProducts).toHaveBeenCalled();
    expect((cmp as any).applyFilters).not.toHaveBeenCalled();
  });

  it('subcategory chip clears only the leaf and reloads', () => {
    const cmp = createCmp();
    cmp.removeChip({ id: 'subcategory:stoneware', type: 'subcategory', label: 'Stoneware' } as any);
    expect((cmp as any).activeCategorySlug).toBe('mugs');
    expect((cmp as any).activeSubcategorySlug).toBe('');
    expect((cmp as any).loadProducts).toHaveBeenCalled();
  });

  it('price chip resets bounds via applyFilters', () => {
    const cmp = createCmp();
    cmp.removeChip({ id: 'price:25-80', type: 'price', label: '25-80' } as any);
    expect((cmp as any).filters.min_price).toBe(0);
    expect((cmp as any).filters.max_price).toBe(1000);
    expect((cmp as any).applyFilters).toHaveBeenCalled();
  });
});
