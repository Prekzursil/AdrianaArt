import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-blank-image-meta-by-lang — blankImageMetaByLang. */
describe('AdminProductsComponent blankImageMetaByLang (golden WU)', () => {
  it('returns en/ro blank image meta forms', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as any;
    expect(cmp.blankImageMetaByLang()).toEqual({
      en: { alt_text: '', caption: '' },
      ro: { alt_text: '', caption: '' },
    });
  });
});
