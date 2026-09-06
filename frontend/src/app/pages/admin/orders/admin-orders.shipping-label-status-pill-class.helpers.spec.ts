import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-shipping-label-status-pill-class — shippingLabelStatusPillClass. */
describe('AdminOrdersComponent shippingLabelStatusPillClass (golden WU)', () => {
  function bare(): AdminOrdersComponent {
    return Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
  }

  it('maps upload status tokens to pill class strings', () => {
    const cmp = bare();
    expect(cmp.shippingLabelStatusPillClass('success' as any)).toContain('emerald');
    expect(cmp.shippingLabelStatusPillClass('uploading' as any)).toContain('indigo');
    expect(cmp.shippingLabelStatusPillClass('error' as any)).toContain('rose');
    expect(cmp.shippingLabelStatusPillClass('pending' as any)).toContain('slate');
  });
});
