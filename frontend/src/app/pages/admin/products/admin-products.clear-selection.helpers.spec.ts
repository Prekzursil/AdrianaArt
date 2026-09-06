import { signal } from '@angular/core';
import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-clear-selection — clearSelection. */
describe('AdminProductsComponent clearSelection (golden WU)', () => {
  it('resets selection, bulk error, and price preview', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      selected: new Set(['p1']),
      bulkError: signal('x'),
      bulkPricePreview: { ok: true },
    });
    cmp.clearSelection();
    expect((cmp as any).selected.size).toBe(0);
    expect((cmp as any).bulkError()).toBeNull();
    expect((cmp as any).bulkPricePreview).toBeNull();
  });
});
