import { ShopComponent } from './shop.component';

/** Golden WU shop-remove-chip-search-tag — removeChip search/tag + onSearch (#721 sidecar). */
describe('ShopComponent removeChip search/tag + onSearch helpers (golden WU)', () => {
  function createCmp(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).filterDebounce = setTimeout(() => undefined, 99999);
    (cmp as any).filters = {
      page: 2,
      search: 'bowl',
      tags: new Set(['ceramic', 'gift']),
      min_price: 0,
      max_price: 100,
    };
    (cmp as any).applyFilters = jasmine.createSpy('applyFilters');
    (cmp as any).loadProducts = jasmine.createSpy('loadProducts');
    return cmp;
  }

  it('search chip clears search via applyFilters', () => {
    const cmp = createCmp();
    cmp.removeChip({ id: 'search:bowl', type: 'search', label: 'bowl' } as any);
    expect((cmp as any).filters.search).toBe('');
    expect((cmp as any).filters.page).toBe(1);
    expect((cmp as any).applyFilters).toHaveBeenCalled();
  });

  it('tag chip deletes the value and applies filters', () => {
    const cmp = createCmp();
    cmp.removeChip({ id: 'tag:gift', type: 'tag', label: 'Gift', value: 'gift' } as any);
    expect(Array.from((cmp as any).filters.tags)).toEqual(['ceramic']);
    expect((cmp as any).applyFilters).toHaveBeenCalled();
  });

  it('onSearch delegates to applyFilters', () => {
    const cmp = createCmp();
    cmp.onSearch();
    expect((cmp as any).applyFilters).toHaveBeenCalled();
  });
});
