import { AdminOrderExportsComponent } from './admin-order-exports.component';

/** Golden WU — kindLabel for document export kinds. */
describe('AdminOrderExportsComponent kindLabel (golden WU)', () => {
  function bare(): AdminOrderExportsComponent {
    const cmp = Object.create(AdminOrderExportsComponent.prototype) as AdminOrderExportsComponent;
    (cmp as any).translate = {
      instant: (key: string) => `t:${key}`,
    };
    return cmp;
  }

  it('maps known kinds via i18n and falls back to raw kind', () => {
    const cmp = bare();
    expect(cmp.kindLabel('packing_slip')).toBe('t:adminUi.orders.exports.kinds.packingSlip');
    expect(cmp.kindLabel('packing_slips_batch')).toBe(
      't:adminUi.orders.exports.kinds.packingSlipsBatch',
    );
    expect(cmp.kindLabel('shipping_label')).toBe('t:adminUi.orders.exports.kinds.shippingLabel');
    expect(cmp.kindLabel('receipt')).toBe('t:adminUi.orders.exports.kinds.receipt');
    expect(cmp.kindLabel('custom_kind')).toBe('custom_kind');
  });
});
