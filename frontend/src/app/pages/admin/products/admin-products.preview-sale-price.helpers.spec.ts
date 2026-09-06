import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-preview-sale-price — previewSalePrice. */
describe('AdminProductsComponent previewSalePrice (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      form: { sale_enabled: true, sale_type: 'percent', sale_value: '10', base_price: '100' },
      parseMoneyInput: (raw: string) => {
        const n = Number(String(raw).replace(',', '.'));
        return Number.isFinite(n) ? n : null;
      },
      ...overrides,
    });
    return cmp;
  }

  it('null when disabled / bad base / amount>base / percent>100; else discounted', () => {
    expect(bare({ form: { sale_enabled: false } }).previewSalePrice()).toBeNull();
    expect(
      bare({
        form: { sale_enabled: true, sale_type: 'amount', sale_value: '10', base_price: '0' },
      }).previewSalePrice(),
    ).toBeNull();
    expect(
      bare({
        form: { sale_enabled: true, sale_type: 'amount', sale_value: '150', base_price: '100' },
      }).previewSalePrice(),
    ).toBeNull();
    expect(
      bare({
        form: { sale_enabled: true, sale_type: 'amount', sale_value: '25', base_price: '100' },
      }).previewSalePrice(),
    ).toBe(75);
    expect(
      bare({
        form: { sale_enabled: true, sale_type: 'percent', sale_value: '101', base_price: '100' },
      }).previewSalePrice(),
    ).toBeNull();
    expect(
      bare({
        form: { sale_enabled: true, sale_type: 'percent', sale_value: '10', base_price: '100' },
      }).previewSalePrice(),
    ).toBe(90);
  });
});
