import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-status-chip-helpers. */
describe('AdminOrderDetailComponent status/payment helpers (golden WU)', () => {
  function bare(): AdminOrderDetailComponent {
    return Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
  }

  it('statusChipClass delegates known and unknown statuses', () => {
    const cmp = bare();
    expect(cmp.statusChipClass('paid')).toContain('indigo');
    expect(cmp.statusChipClass('delivered')).toContain('emerald');
    expect(cmp.statusChipClass('mystery')).toContain('slate');
  });

  it('hasPaymentCaptured checks paypal capture and stripe events', () => {
    const fn = (AdminOrderDetailComponent.prototype as any).hasPaymentCaptured.bind(bare());
    expect(fn(null)).toBe(false);
    expect(fn({ payment_method: 'paypal', paypal_capture_id: 'CAP' })).toBe(true);
    expect(fn({ payment_method: 'paypal', paypal_capture_id: '  ' })).toBe(false);
    expect(
      fn({ payment_method: 'stripe', events: [{ event: 'payment_captured' }] }),
    ).toBe(true);
    expect(fn({ payment_method: 'stripe', events: [{ event: 'created' }] })).toBe(false);
    expect(fn({ payment_method: 'cod' })).toBe(false);
  });

  it('normalizeCountry uppercases trimmed country', () => {
    const fn = (AdminOrderDetailComponent.prototype as any).normalizeCountry.bind(bare());
    expect(fn(' ro ')).toBe('RO');
    expect(fn(null)).toBe('');
    expect(fn(undefined)).toBe('');
  });
});
