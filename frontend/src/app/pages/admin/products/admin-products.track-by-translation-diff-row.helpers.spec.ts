import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-track-by-translation-diff-row — trackByTranslationDiffRow. */
describe('AdminProductsComponent trackByTranslationDiffRow (golden WU)', () => {
  it('returns the row field', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    expect(cmp.trackByTranslationDiffRow(0, { field: 'name' } as any)).toBe('name');
    expect(cmp.trackByTranslationDiffRow(2, { field: 'description' } as any)).toBe('description');
  });
});
