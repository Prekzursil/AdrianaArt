import { AdminProductsComponent } from './admin-products.component';

/** Golden WU admin-products-delete-translation -- deleteTranslation. */
describe('AdminProductsComponent deleteTranslation (golden WU)', () => {
  it('returns early when editing slug is missing', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      editingSlug: jasmine.createSpy('slug').and.returnValue(null),
      translationError: { set: jasmine.createSpy('err') },
      admin: { deleteProductTranslation: jasmine.createSpy('del') },
    });
    cmp.deleteTranslation('en');
    expect((cmp as any).translationError.set).not.toHaveBeenCalled();
    expect((cmp as any).admin.deleteProductTranslation).not.toHaveBeenCalled();
  });
});
