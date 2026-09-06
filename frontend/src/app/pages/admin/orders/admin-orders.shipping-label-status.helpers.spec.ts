import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-shipping-label-status-helpers. */
describe('AdminOrdersComponent shipping label status helpers (golden WU)', () => {
  function bare(): AdminOrdersComponent {
    return Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
  }

  it('shippingLabelStatusLabelKey builds i18n key from status', () => {
    const cmp = bare();
    expect(cmp.shippingLabelStatusLabelKey('pending' as any)).toBe(
      'adminUi.orders.shippingLabelsModal.status.pending',
    );
    expect(cmp.shippingLabelStatusLabelKey('error' as any)).toBe(
      'adminUi.orders.shippingLabelsModal.status.error',
    );
  });

  it('shippingLabelStatusPillClass maps status to pill classes', () => {
    const cmp = bare();
    expect(cmp.shippingLabelStatusPillClass('success' as any)).toContain('emerald');
    expect(cmp.shippingLabelStatusPillClass('uploading' as any)).toContain('indigo');
    expect(cmp.shippingLabelStatusPillClass('error' as any)).toContain('rose');
    expect(cmp.shippingLabelStatusPillClass('pending' as any)).toContain('slate');
  });
});
