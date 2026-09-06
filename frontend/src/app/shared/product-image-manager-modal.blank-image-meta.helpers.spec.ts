import { ProductImageManagerModalComponent } from './product-image-manager-modal.component';

/** Golden WU product-image-manager-modal-blank-image-meta — blankImageMeta. */
describe('ProductImageManagerModalComponent blankImageMeta (golden WU)', () => {
  it('returns empty en/ro meta shells', () => {
    const cmp = Object.create(ProductImageManagerModalComponent.prototype) as ProductImageManagerModalComponent;
    const meta = (cmp as any).blankImageMeta();
    expect(meta).toEqual({
      ro: { alt_text: '', caption: '' },
      en: { alt_text: '', caption: '' },
    });
  });
});
