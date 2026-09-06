import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-seo-preview-description — seoPreviewDescription. */
describe('AdminProductsComponent seoPreviewDescription (golden WU)', () => {
  it('prefers translated short, collapses whitespace, truncates at 160', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).translations = {};
    (cmp as any).form = {};
    expect(cmp.seoPreviewDescription('en')).toBe('—');
    (cmp as any).translations = { en: { short_description: '  Hello   world  ' } };
    expect(cmp.seoPreviewDescription('en')).toBe('Hello world');
    (cmp as any).translations = { en: { short_description: '', long_description: 'L'.repeat(200) } };
    const out = cmp.seoPreviewDescription('en');
    expect(out.endsWith('…')).toBe(true);
    expect(out.length).toBe(158);
  });
});
