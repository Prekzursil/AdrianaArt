import { AdminProductsComponent } from './admin-products.component';

/** Golden WU admin-products-confirm-delete-image -- confirmDeleteImage. */
describe('AdminProductsComponent confirmDeleteImage (golden WU)', () => {
  it('returns early when editing slug is missing', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      editingSlug: jasmine.createSpy('slug').and.returnValue(null),
      deleteImageConfirmTarget: jasmine.createSpy('target').and.returnValue({ id: 'i1' }),
      deleteImageConfirmBusy: jasmine.createSpy('busy').and.returnValue(false),
    });
    (cmp as any).deleteImageConfirmBusy.set = jasmine.createSpy('set');
    cmp.confirmDeleteImage();
    expect((cmp as any).deleteImageConfirmBusy.set).not.toHaveBeenCalled();
  });
});
