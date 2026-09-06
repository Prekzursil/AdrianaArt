import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU admin-orders-close-shipping-labels-modal -- closeShippingLabelsModal. */
describe('AdminOrdersComponent closeShippingLabelsModal (golden WU)', () => {
  it('returns early when shipping labels are busy', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, {
      shippingLabelsBusy: true,
      shippingLabelsModalOpen: { set: jasmine.createSpy('set') },
      shippingLabelsUploads: [{ file: {} }],
      shippingLabelsOrderOptions: [{ id: 'o1' }],
    });
    cmp.closeShippingLabelsModal();
    expect((cmp as any).shippingLabelsModalOpen.set).not.toHaveBeenCalled();
    expect((cmp as any).shippingLabelsUploads.length).toBe(1);
  });
});
