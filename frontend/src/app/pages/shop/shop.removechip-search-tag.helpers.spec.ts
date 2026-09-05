import { ShopComponent } from './shop.component';

/** Golden WU shop-removechip-search-tag — N=3 removeChip search/tag + onSearch. */
describe('ShopComponent removeChip search/tag helpers (golden WU)', () => {
  function createCmp(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).cancelFilterDebounce = jasmine.createSpy('cancelFilterDebounce');
    (cmp as any).applyFilters = jasmine.createSpy('applyFilters');
    (cmp as any).loadProducts = jasmine.createSpy('loadProducts');
    (cmp as any).filters = { page: 4, search: 'portrait', tags: new Set(['matte', 'framed']) };
    return cmp;
  }

  it('removeChip clears search text via applyFilters', () => {
    const cmp = createCmp();
    cmp.removeChip({ type: 'search', id: 'search', label: 'portrait' } as any);
    expect((cmp as any).cancelFilterDebounce).toHaveBeenCalled();
    expect((cmp as any).filters.page).toBe(1);
    expect((cmp as any).filters.search).toBe('');
    expect((cmp as any).applyFilters).toHaveBeenCalled();
  });

  it('removeChip deletes a tag value via applyFilters', () => {
    const cmp = createCmp();
    (cmp as any).filters.page = 2;
    cmp.removeChip({ type: 'tag', id: 'tag:matte', label: 'matte', value: 'matte' } as any);
    expect((cmp as any).filters.tags.has('matte')).toBe(false);
    expect((cmp as any).filters.tags.has('framed')).toBe(true);
    expect((cmp as any).applyFilters).toHaveBeenCalled();
  });

  it('onSearch delegates to applyFilters', () => {
    const cmp = createCmp();
    cmp.onSearch();
    expect((cmp as any).applyFilters).toHaveBeenCalled();
  });
});
