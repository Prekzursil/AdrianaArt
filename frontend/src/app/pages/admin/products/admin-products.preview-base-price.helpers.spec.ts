import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-preview-base-price-helpers. */
describe('AdminProductsComponent preview price helpers (golden WU)', () => {
  function bare(form: Record<string, unknown>): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      form,
      parseMoneyInput: (raw: string) => {
        const n = Number(String(raw || '').trim());
        return Number.isFinite(n) && String(raw || '').trim() ? Math.round(n * 100) / 100 : null;
      },
    });
    return cmp;
  }

  it('previewBasePrice returns parsed or 0', () => {
    expect(bare({ base_price: '12.5' }).previewBasePrice()).toBe(12.5);
    expect(bare({ base_price: '' }).previewBasePrice()).toBe(0);
  });

  it('previewSalePrice computes amount/percent discounts', () => {
    expect(
      bare({ base_price: '100', sale_enabled: true, sale_type: 'amount', sale_value: '10' }).previewSalePrice(),
    ).toBe(90);
    expect(
      bare({ base_price: '100', sale_enabled: true, sale_type: 'percent', sale_value: '25' }).previewSalePrice(),
    ).toBe(75);
    expect(bare({ base_price: '100', sale_enabled: false }).previewSalePrice()).toBeNull();
  });
});
