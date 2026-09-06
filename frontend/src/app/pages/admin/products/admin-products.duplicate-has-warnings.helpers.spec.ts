import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-duplicate-has-warnings — duplicateHasWarnings. */
describe('AdminProductsComponent duplicateHasWarnings (golden WU)', () => {
  it('false when null; true on slug drift or sku/name matches', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).duplicateCheck = () => null;
    expect(cmp.duplicateHasWarnings()).toBe(false);
    (cmp as any).duplicateCheck = () => ({
      slug_base: 'a',
      suggested_slug: 'a',
      sku_matches: [],
      name_matches: [],
    });
    expect(cmp.duplicateHasWarnings()).toBe(false);
    (cmp as any).duplicateCheck = () => ({
      slug_base: 'a',
      suggested_slug: 'a-2',
      sku_matches: [],
      name_matches: [],
    });
    expect(cmp.duplicateHasWarnings()).toBe(true);
    (cmp as any).duplicateCheck = () => ({
      slug_base: 'a',
      suggested_slug: 'a',
      sku_matches: [{ id: '1' }],
      name_matches: [],
    });
    expect(cmp.duplicateHasWarnings()).toBe(true);
  });
});
