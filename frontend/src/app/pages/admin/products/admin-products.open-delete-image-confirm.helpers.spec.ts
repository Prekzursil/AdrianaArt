import { AdminProductsComponent } from './admin-products.component';

/** Golden WU admin-products-open-delete-image-confirm -- openDeleteImageConfirm. */
describe('AdminProductsComponent openDeleteImageConfirm (golden WU)', () => {
  it('returns early when image id is missing from images()', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      images: jasmine.createSpy('images').and.returnValue([]),
      deleteImageConfirmTarget: { set: jasmine.createSpy('target') },
      deleteImageConfirmBusy: { set: jasmine.createSpy('busy') },
      deleteImageConfirmOpen: { set: jasmine.createSpy('open') },
    });
    cmp.openDeleteImageConfirm('missing');
    expect((cmp as any).deleteImageConfirmOpen.set).not.toHaveBeenCalled();
  });
});
