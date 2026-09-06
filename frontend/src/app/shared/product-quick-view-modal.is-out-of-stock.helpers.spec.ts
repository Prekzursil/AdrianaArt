import { ProductQuickViewModalComponent } from './product-quick-view-modal.component';

/** Golden WU product-quick-view-modal-is-out-of-stock — isOutOfStock. */
describe('ProductQuickViewModalComponent isOutOfStock (golden WU)', () => {
  it('treats zero stock without backorder as sold out', () => {
    const cmp = Object.create(ProductQuickViewModalComponent.prototype) as ProductQuickViewModalComponent;
    (cmp as any).product = null;
    expect(cmp.isOutOfStock()).toBe(false);
    (cmp as any).product = { stock_quantity: 0, allow_backorder: false, variants: [] };
    (cmp as any).selectedVariantId = null;
    expect(cmp.isOutOfStock()).toBe(true);
    (cmp as any).product = { stock_quantity: 0, allow_backorder: true, variants: [] };
    expect(cmp.isOutOfStock()).toBe(false);
  });
});
