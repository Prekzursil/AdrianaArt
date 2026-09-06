import { ProductComponent } from './product.component';

/** Golden WU product-close-preview — closePreview. */
describe('ProductComponent closePreview (golden WU)', () => {
  it('sets previewOpen false', () => {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    Object.assign(cmp as any, { previewOpen: true });
    cmp.closePreview();
    expect((cmp as any).previewOpen).toBe(false);
  });
});
