import { ProductComponent } from './product.component';

/** Golden WU product-image-preview — N=3 setActiveImage / openPreview / closePreview. */
describe('ProductComponent image/preview helpers (golden WU)', () => {
  function createCmp(): ProductComponent {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).activeImageIndex = 0;
    (cmp as any).previewOpen = false;
    return cmp;
  }

  it('setActiveImage updates activeImageIndex', () => {
    const cmp = createCmp();
    cmp.setActiveImage(3);
    expect((cmp as any).activeImageIndex).toBe(3);
    cmp.setActiveImage(0);
    expect((cmp as any).activeImageIndex).toBe(0);
  });

  it('openPreview sets previewOpen true', () => {
    const cmp = createCmp();
    cmp.openPreview();
    expect((cmp as any).previewOpen).toBe(true);
  });

  it('closePreview sets previewOpen false', () => {
    const cmp = createCmp();
    (cmp as any).previewOpen = true;
    cmp.closePreview();
    expect((cmp as any).previewOpen).toBe(false);
  });
});
