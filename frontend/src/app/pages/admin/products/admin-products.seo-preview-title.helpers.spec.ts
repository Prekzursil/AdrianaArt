import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-seo-preview-title — seoPreviewTitle. */
describe('AdminProductsComponent seoPreviewTitle (golden WU)', () => {
  it('em dash passthrough; else appends brand suffix', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).seoPreviewName = () => '—';
    expect(cmp.seoPreviewTitle('en')).toBe('—');
    (cmp as any).seoPreviewName = (lang: string) => (lang === 'ro' ? 'Produs' : 'Product');
    expect(cmp.seoPreviewTitle('en')).toBe('Product | momentstudio');
    expect(cmp.seoPreviewTitle('ro')).toBe('Produs | momentstudio');
  });
});
