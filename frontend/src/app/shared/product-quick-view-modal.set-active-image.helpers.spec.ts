import { ProductQuickViewModalComponent } from './product-quick-view-modal.component';

/** Golden WU product-quick-view-modal-set-active-image — setActiveImage. */
describe('ProductQuickViewModalComponent setActiveImage (golden WU)', () => {
  it('stores the active image index', () => {
    const cmp = Object.create(ProductQuickViewModalComponent.prototype) as ProductQuickViewModalComponent;
    (cmp as any).activeImageIndex = 0;
    cmp.setActiveImage(2);
    expect((cmp as any).activeImageIndex).toBe(2);
  });
});
