import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU admin-orders-close-layout-modal -- closeLayoutModal. */
describe('AdminOrdersComponent closeLayoutModal (golden WU)', () => {
  it('sets layoutModalOpen to false', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, {
      layoutModalOpen: { set: jasmine.createSpy('set') },
    });
    cmp.closeLayoutModal();
    expect((cmp as any).layoutModalOpen.set).toHaveBeenCalledWith(false);
  });
});
