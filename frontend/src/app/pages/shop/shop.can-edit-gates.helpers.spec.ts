import { signal } from '@angular/core';
import { ShopComponent } from './shop.component';

/** Golden WU shop-can-edit-gates-helpers. */
describe('ShopComponent edit/reorder gates (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      storefrontAdminMode: { enabled: () => true },
      bulkSelectMode: signal(false),
      productReorderSaving: signal(false),
      loading: signal(false),
      hasError: signal(false),
      filters: { sort: 'recommended' },
      activeLeafCategorySlug: () => 'leaf',
      pageMeta: { total_pages: 1, page: 1, total_items: 3 },
      paginationMode: 'pages',
      products: [{ id: '1' }, { id: '2' }],
      ...overrides,
    });
    return cmp;
  }

  it('canEdit* mirrors storefront admin mode', () => {
    expect(bare().canEditCategories()).toBe(true);
    expect(bare().canEditProducts()).toBe(true);
    expect(bare({ storefrontAdminMode: { enabled: () => false } }).canEditProducts()).toBe(false);
  });

  it('canReorderProducts requires leaf + loaded recommended list', () => {
    expect(bare().canReorderProducts()).toBe(true);
    expect(bare({ filters: { sort: 'price' } }).canReorderProducts()).toBe(false);
    expect(bare({ products: [{ id: '1' }] }).canReorderProducts()).toBe(false);
    expect(bare({ bulkSelectMode: signal(true) }).canReorderProducts()).toBe(false);
  });
});
