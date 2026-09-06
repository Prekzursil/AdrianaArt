import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-use-virtual-table — useVirtualProductsTable. */
describe('AdminProductsComponent useVirtualProductsTable (golden WU)', () => {
  it('true only when not inline-editing and >100 products', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).inlineEditId = null;
    (cmp as any).products = () => Array.from({ length: 100 }, (_, i) => ({ id: String(i) }));
    expect(cmp.useVirtualProductsTable()).toBe(false);
    (cmp as any).products = () => Array.from({ length: 101 }, (_, i) => ({ id: String(i) }));
    expect(cmp.useVirtualProductsTable()).toBe(true);
    (cmp as any).inlineEditId = 'p1';
    expect(cmp.useVirtualProductsTable()).toBe(false);
  });
});
