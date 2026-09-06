import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-sale-preview-info — salePreviewInfo. */
describe('AdminProductsComponent salePreviewInfo (golden WU)', () => {
  it('null without sale; else sale/saved/percent', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).previewSalePrice = () => null;
    expect(cmp.salePreviewInfo()).toBeNull();
    (cmp as any).previewSalePrice = () => 80;
    (cmp as any).previewBasePrice = () => 0;
    expect(cmp.salePreviewInfo()).toBeNull();
    (cmp as any).previewBasePrice = () => 100;
    expect(cmp.salePreviewInfo()).toEqual({ sale: 80, saved: 20, percent: 20 });
    (cmp as any).previewSalePrice = () => 100;
    expect(cmp.salePreviewInfo()).toBeNull();
  });
});
