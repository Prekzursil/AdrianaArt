import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU admin-order-detail-close-address-editor -- closeAddressEditor. */
describe('AdminOrderDetailComponent closeAddressEditor (golden WU)', () => {
  it('closes editor and clears error', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    Object.assign(cmp as any, {
      addressEditorOpen: { set: jasmine.createSpy('openSet') },
      addressEditorError: { set: jasmine.createSpy('errSet') },
    });
    cmp.closeAddressEditor();
    expect((cmp as any).addressEditorOpen.set).toHaveBeenCalledWith(false);
    expect((cmp as any).addressEditorError.set).toHaveBeenCalledWith(null);
  });
});
