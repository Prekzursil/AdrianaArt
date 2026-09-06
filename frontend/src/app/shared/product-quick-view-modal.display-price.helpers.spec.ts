import { ProductQuickViewModalComponent } from './product-quick-view-modal.component';

/** Golden WU product-quick-view-modal-display-price — displayPrice. */
describe('ProductQuickViewModalComponent displayPrice (golden WU)', () => {
  it('prefers sale_price when on sale else base_price', () => {
    const cmp = Object.create(ProductQuickViewModalComponent.prototype) as ProductQuickViewModalComponent;
    expect(cmp.displayPrice({ base_price: 12, sale_price: 9 } as any)).toBe(9);
    expect(cmp.displayPrice({ base_price: 12, sale_price: null } as any)).toBe(12);
  });
});
