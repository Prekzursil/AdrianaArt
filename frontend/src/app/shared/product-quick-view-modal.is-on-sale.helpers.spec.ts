import { ProductQuickViewModalComponent } from './product-quick-view-modal.component';

/** Golden WU product-quick-view-modal-is-on-sale — isOnSale. */
describe('ProductQuickViewModalComponent isOnSale (golden WU)', () => {
  it('requires finite sale_price below base_price', () => {
    const cmp = Object.create(ProductQuickViewModalComponent.prototype) as ProductQuickViewModalComponent;
    expect(cmp.isOnSale({ base_price: 10, sale_price: 8 } as any)).toBe(true);
    expect(cmp.isOnSale({ base_price: 10, sale_price: 10 } as any)).toBe(false);
    expect(cmp.isOnSale({ base_price: 10, sale_price: null } as any)).toBe(false);
  });
});
