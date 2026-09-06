import { AdminProductsComponent } from './admin-products.component';

/** Golden WU admin-products-close-delete-image-confirm -- closeDeleteImageConfirm. */
describe('AdminProductsComponent closeDeleteImageConfirm (golden WU)', () => {
  it('clears confirm modal state', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      deleteImageConfirmOpen: { set: jasmine.createSpy('open') },
      deleteImageConfirmBusy: { set: jasmine.createSpy('busy') },
      deleteImageConfirmTarget: { set: jasmine.createSpy('target') },
    });
    cmp.closeDeleteImageConfirm();
    expect((cmp as any).deleteImageConfirmOpen.set).toHaveBeenCalledWith(false);
    expect((cmp as any).deleteImageConfirmBusy.set).toHaveBeenCalledWith(false);
    expect((cmp as any).deleteImageConfirmTarget.set).toHaveBeenCalledWith(null);
  });
});
