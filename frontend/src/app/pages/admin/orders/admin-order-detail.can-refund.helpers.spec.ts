import { signal } from '@angular/core';
import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-can-refund-helpers. */
describe('AdminOrderDetailComponent refund/address helpers (golden WU)', () => {
  function bare(status: string | null): AdminOrderDetailComponent {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    Object.assign(cmp as any, {
      order: signal(status == null ? null : { status }),
    });
    return cmp;
  }

  it('canRefund allows paid/shipped/delivered only', () => {
    expect(bare('paid').canRefund()).toBe(true);
    expect(bare('shipped').canRefund()).toBe(true);
    expect(bare('delivered').canRefund()).toBe(true);
    expect(bare('pending').canRefund()).toBe(false);
    expect(bare(null).canRefund()).toBe(false);
  });

  it('formatAddressSnapshot joins lines or em-dash', () => {
    const cmp = bare('paid');
    expect(cmp.formatAddressSnapshot(null)).toBe('—');
    expect(cmp.formatAddressSnapshot([])).toBe('—');
    expect(
      cmp.formatAddressSnapshot({
        label: 'Home',
        phone: '07',
        line1: 'Str 1',
        city: 'Buc',
        region: 'B',
        postal_code: '010101',
        country: 'RO',
      }),
    ).toBe('Home\n07\nStr 1\nBuc, B 010101\nRO');
  });
});
