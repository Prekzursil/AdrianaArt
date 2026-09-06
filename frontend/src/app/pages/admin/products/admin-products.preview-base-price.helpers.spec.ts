import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-preview-base-price — previewBasePrice. */
describe('AdminProductsComponent previewBasePrice (golden WU)', () => {
  it('parses form.base_price via parseMoneyInput; null -> 0', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).form = { base_price: '12.50' };
    (cmp as any).parseMoneyInput = (raw: string) => (raw === '12.50' ? 12.5 : null);
    expect(cmp.previewBasePrice()).toBe(12.5);
    (cmp as any).form = { base_price: '' };
    (cmp as any).parseMoneyInput = () => null;
    expect(cmp.previewBasePrice()).toBe(0);
  });
});
