import { ProductComponent } from './product.component';

describe('ProductComponent activeImage / preview helpers (golden WU)', () => {
  function make(partial: Record<string, unknown> = {}) {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    Object.assign(cmp as any, {
      product: null,
      activeImageIndex: 0,
      previewOpen: false,
      ...partial,
    });
    return cmp;
  }

  it('activeImage falls back to placeholder, else indexed/first url', () => {
    expect(make().activeImage).toBe('assets/placeholder/product-placeholder.svg');
    expect(make({ product: { images: [] } }).activeImage).toBe(
      'assets/placeholder/product-placeholder.svg',
    );
    const withImages = make({
      product: { images: [{ url: 'a.jpg' }, { url: 'b.jpg' }] },
      activeImageIndex: 1,
    });
    expect(withImages.activeImage).toBe('b.jpg');
    withImages.activeImageIndex = 99;
    expect(withImages.activeImage).toBe('a.jpg');
  });

  it('setActiveImage / openPreview / closePreview mutate local state', () => {
    const cmp = make();
    cmp.setActiveImage(2);
    expect((cmp as any).activeImageIndex).toBe(2);
    cmp.openPreview();
    expect((cmp as any).previewOpen).toBe(true);
    cmp.closePreview();
    expect((cmp as any).previewOpen).toBe(false);
  });
});
