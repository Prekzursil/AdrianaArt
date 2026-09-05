import { signal } from '@angular/core';
import { ShopComponent } from './shop.component';

/** Golden WU shop-can-reorder-finite — N=3 non-finite totalPages/page/totalItems gates (#734 sidecar). */
describe('ShopComponent canReorderProducts finite helpers (golden WU)', () => {
  function createCmp(meta: Record<string, unknown>): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).canEditProducts = () => true;
    (cmp as any).bulkSelectMode = signal(false);
    (cmp as any).productReorderSaving = signal(false);
    (cmp as any).loading = signal(false);
    (cmp as any).hasError = signal(false);
    (cmp as any).filters = { sort: 'recommended', limit: 12 };
    (cmp as any).activeLeafCategorySlug = () => 'ceramics';
    (cmp as any).paginationMode = 'pages';
    (cmp as any).products = [{ id: 'a' }, { id: 'b' }];
    (cmp as any).pageMeta = meta;
    return cmp;
  }

  it('rejects non-finite or sub-1 totalPages', () => {
    expect(createCmp({ total_pages: Number.NaN, page: 1, total_items: 2 }).canReorderProducts()).toBe(
      false,
    );
    expect(createCmp({ total_pages: 0, page: 1, total_items: 2 }).canReorderProducts()).toBe(false);
  });

  it('rejects non-finite or sub-1 page', () => {
    expect(createCmp({ total_pages: 1, page: Number.NaN, total_items: 2 }).canReorderProducts()).toBe(
      false,
    );
    expect(createCmp({ total_pages: 1, page: 0, total_items: 2 }).canReorderProducts()).toBe(false);
  });

  it('rejects non-finite or negative totalItems; allows finite happy path', () => {
    expect(createCmp({ total_pages: 1, page: 1, total_items: Number.NaN }).canReorderProducts()).toBe(
      false,
    );
    expect(createCmp({ total_pages: 1, page: 1, total_items: -1 }).canReorderProducts()).toBe(false);
    expect(createCmp({ total_pages: 1, page: 1, total_items: 2 }).canReorderProducts()).toBe(true);
  });
});
