import { AdminProductsComponent } from './admin-products.component';

/** Golden WU admin-products-delete-category-selected-safe -- deleteCategorySelectedSafe. */
describe('AdminProductsComponent deleteCategorySelectedSafe (golden WU)', () => {
  it('returns early when no category is selected', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      categoryManagerSelectedCategory: jasmine.createSpy('cat').and.returnValue(null),
      deleteSaving: jasmine.createSpy('saving').and.returnValue(false),
      deletePreview: jasmine.createSpy('preview'),
    });
    cmp.deleteCategorySelectedSafe();
    expect((cmp as any).deletePreview).not.toHaveBeenCalled();
  });
});
