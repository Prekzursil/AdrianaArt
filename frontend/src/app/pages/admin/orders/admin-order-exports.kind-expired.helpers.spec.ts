import { AdminOrderExportsComponent } from './admin-order-exports.component';

/** Golden WU order-exports-kind-expired-helpers. */
describe('AdminOrderExportsComponent expire/kind helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminOrderExportsComponent {
    const cmp = Object.create(AdminOrderExportsComponent.prototype) as AdminOrderExportsComponent;
    Object.assign(cmp as any, {
      translate: { instant: (k: string) => k },
      ...overrides,
    });
    return cmp;
  }

  it('isExpired treats missing/future/past expires_at', () => {
    const cmp = bare();
    expect(cmp.isExpired({ expires_at: '' } as any)).toBe(false);
    expect(cmp.isExpired({ expires_at: new Date(Date.now() + 60_000).toISOString() } as any)).toBe(false);
    expect(cmp.isExpired({ expires_at: new Date(Date.now() - 60_000).toISOString() } as any)).toBe(true);
  });

  it('kindLabel translates known kinds and falls back', () => {
    const cmp = bare();
    expect(cmp.kindLabel('packing_slip')).toBe('adminUi.orders.exports.kinds.packingSlip');
    expect(cmp.kindLabel('shipping_label')).toBe('adminUi.orders.exports.kinds.shippingLabel');
    expect(cmp.kindLabel('receipt')).toBe('adminUi.orders.exports.kinds.receipt');
    expect(cmp.kindLabel('custom')).toBe('custom');
  });
});
