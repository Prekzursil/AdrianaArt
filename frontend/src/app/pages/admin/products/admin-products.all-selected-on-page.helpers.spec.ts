import { signal } from '@angular/core';
import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-all-selected-on-page — allSelectedOnPage. */
describe('AdminProductsComponent allSelectedOnPage (golden WU)', () => {
  function bare(view: string, items: Array<{ id: string }>, selected: Set<string>): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      view,
      products: signal(items),
      selected,
    });
    return cmp;
  }

  it('requires active view with every page id selected', () => {
    const items = [{ id: 'p1' }, { id: 'p2' }];
    expect(bare('deleted', items, new Set(['p1', 'p2'])).allSelectedOnPage()).toBe(false);
    expect(bare('active', [], new Set()).allSelectedOnPage()).toBe(false);
    expect(bare('active', items, new Set(['p1'])).allSelectedOnPage()).toBe(false);
    expect(bare('active', items, new Set(['p1', 'p2'])).allSelectedOnPage()).toBe(true);
  });
});
