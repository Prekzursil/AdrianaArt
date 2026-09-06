import { ProductComponent } from './product.component';

/** Golden WU product-preview-open-close — openPreview/closePreview. */
describe('ProductComponent openPreview/closePreview (golden WU)', () => {
  it('toggles previewOpen', () => {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).previewOpen = false;
    cmp.openPreview();
    expect((cmp as any).previewOpen).toBe(true);
    cmp.closePreview();
    expect((cmp as any).previewOpen).toBe(false);
  });
});
