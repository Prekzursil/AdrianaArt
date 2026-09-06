import { signal } from '@angular/core';
import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU inventory-all-selected-on-page — allSelectedOnPage. */
describe('AdminInventoryComponent allSelectedOnPage (golden WU)', () => {
  function bare(rows: any[], selected: Set<string>): AdminInventoryComponent {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, { rows: signal(rows), selected });
    return cmp;
  }

  it('requires non-empty page with every row selected', () => {
    const rows = [
      { kind: 'variant', variant_id: 'v1', product_id: 'p1' },
      { kind: 'product', product_id: 'p2' },
    ];
    expect(bare([], new Set()).allSelectedOnPage()).toBe(false);
    expect(bare(rows, new Set(['variant:v1'])).allSelectedOnPage()).toBe(false);
    expect(bare(rows, new Set(['variant:v1', 'product:p2'])).allSelectedOnPage()).toBe(true);
  });
});
