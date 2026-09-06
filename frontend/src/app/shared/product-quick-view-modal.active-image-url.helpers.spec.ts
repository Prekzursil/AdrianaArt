import { ProductQuickViewModalComponent } from './product-quick-view-modal.component';

/** Golden WU product-quick-view-modal-active-image-url — activeImageUrl. */
describe('ProductQuickViewModalComponent activeImageUrl (golden WU)', () => {
  it('clamps index and falls back to placeholder', () => {
    const cmp = Object.create(ProductQuickViewModalComponent.prototype) as ProductQuickViewModalComponent;
    Object.assign(cmp as any, { product: null, activeImageIndex: 0 });
    expect(cmp.activeImageUrl()).toBe('assets/placeholder/product-placeholder.svg');
    Object.assign(cmp as any, {
      product: { images: [{ url: 'a.jpg' }, { url: 'b.jpg' }] },
      activeImageIndex: 1,
    });
    expect(cmp.activeImageUrl()).toBe('b.jpg');
    Object.assign(cmp as any, { activeImageIndex: 99 });
    expect(cmp.activeImageUrl()).toBe('b.jpg');
    Object.assign(cmp as any, { activeImageIndex: -3 });
    expect(cmp.activeImageUrl()).toBe('a.jpg');
  });
});
