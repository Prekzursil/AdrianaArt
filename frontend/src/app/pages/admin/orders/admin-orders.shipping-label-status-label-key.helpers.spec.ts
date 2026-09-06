import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-shipping-label-status-label-key — shippingLabelStatusLabelKey. */
describe('AdminOrdersComponent shippingLabelStatusLabelKey (golden WU)', () => {
  function bare(): AdminOrdersComponent {
    return Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
  }

  it('maps status tokens into i18n keys', () => {
    const cmp = bare();
    expect(cmp.shippingLabelStatusLabelKey('pending')).toBe(
      'adminUi.orders.shippingLabelsModal.status.pending',
    );
    expect(cmp.shippingLabelStatusLabelKey('uploading')).toBe(
      'adminUi.orders.shippingLabelsModal.status.uploading',
    );
    expect(cmp.shippingLabelStatusLabelKey('success')).toBe(
      'adminUi.orders.shippingLabelsModal.status.success',
    );
    expect(cmp.shippingLabelStatusLabelKey('error')).toBe(
      'adminUi.orders.shippingLabelsModal.status.error',
    );
  });
});
