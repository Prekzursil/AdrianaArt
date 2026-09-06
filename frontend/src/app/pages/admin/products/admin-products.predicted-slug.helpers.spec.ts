import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-predicted-slug — predictedSlug. */
describe('AdminProductsComponent predictedSlug (golden WU)', () => {
  it('prefers editingSlug, else trimmed suggested_slug, else null', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).editingSlug = () => 'kept';
    (cmp as any).duplicateCheck = () => ({ suggested_slug: 'other' });
    expect(cmp.predictedSlug()).toBe('kept');
    (cmp as any).editingSlug = () => '';
    (cmp as any).duplicateCheck = () => ({ suggested_slug: '  new-slug  ' });
    expect(cmp.predictedSlug()).toBe('  new-slug  ');
    (cmp as any).duplicateCheck = () => ({ suggested_slug: '   ' });
    expect(cmp.predictedSlug()).toBeNull();
    (cmp as any).duplicateCheck = () => null;
    expect(cmp.predictedSlug()).toBeNull();
  });
});
