import { AdminProductsComponent } from './admin-products.component';

/** Golden WU — seoPreviewName prefers translation then form name. */
describe('AdminProductsComponent seoPreviewName (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      translations: { en: { name: '' }, ro: { name: '' } },
      form: { name: '' },
      ...overrides,
    });
    return cmp;
  }

  it('prefers translated name, then form name, else em dash', () => {
    expect(bare({ translations: { en: { name: 'EN' }, ro: { name: '' } } }).seoPreviewName('en')).toBe('EN');
    expect(bare({ form: { name: 'Base' } }).seoPreviewName('en')).toBe('Base');
    expect(bare().seoPreviewName('ro')).toBe('—');
  });
});
