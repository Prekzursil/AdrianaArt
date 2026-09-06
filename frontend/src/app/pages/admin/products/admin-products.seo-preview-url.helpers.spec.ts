import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-seo-preview-url — seoPreviewUrl. */
describe('AdminProductsComponent seoPreviewUrl (golden WU)', () => {
  it('uses predictedSlug or <slug> placeholder', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).predictedSlug = () => 'tea-mug';
    expect(cmp.seoPreviewUrl()).toBe('/products/tea-mug');
    (cmp as any).predictedSlug = () => null;
    expect(cmp.seoPreviewUrl()).toBe('/products/<slug>');
    (cmp as any).predictedSlug = () => '';
    expect(cmp.seoPreviewUrl()).toBe('/products/<slug>');
  });
});
