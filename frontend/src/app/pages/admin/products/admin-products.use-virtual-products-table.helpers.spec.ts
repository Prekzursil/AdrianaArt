import { signal } from '@angular/core';
import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-use-virtual-products-table — useVirtualProductsTable. */
describe('AdminProductsComponent useVirtualProductsTable (golden WU)', () => {
  function bare(inlineEditId: string | null, count: number): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      inlineEditId,
      products: signal(Array.from({ length: count }, (_, i) => ({ id: String(i) }))),
    });
    return cmp;
  }

  it('virtualizes only when not inline-editing and >100 rows', () => {
    expect(bare(null, 101).useVirtualProductsTable()).toBe(true);
    expect(bare(null, 100).useVirtualProductsTable()).toBe(false);
    expect(bare('p1', 200).useVirtualProductsTable()).toBe(false);
  });
});
