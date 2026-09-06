import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-blank-image-meta-form — blankImageMetaForm. */
describe('AdminProductsComponent blankImageMetaForm (golden WU)', () => {
  it('returns empty alt/caption form', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as any;
    expect(cmp.blankImageMetaForm()).toEqual({ alt_text: '', caption: '' });
  });
});
