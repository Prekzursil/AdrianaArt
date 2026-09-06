import { signal } from '@angular/core';
import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-order-ref-helpers. */
describe('AdminOrderDetailComponent orderRef/tracking helpers (golden WU)', () => {
  function bare(order: any): AdminOrderDetailComponent {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    Object.assign(cmp as any, {
      order: signal(order),
      translate: { instant: (k: string) => k },
    });
    return cmp;
  }

  it('orderRef prefers reference_code else id prefix', () => {
    expect(bare(null).orderRef()).toBe('');
    expect(bare({ reference_code: 'ABC', id: '123456789' }).orderRef()).toBe('ABC');
    expect(bare({ reference_code: '', id: '123456789' }).orderRef()).toBe('12345678');
  });

  it('validateTrackingFields accepts empty and valid https urls', () => {
    const fn = (AdminOrderDetailComponent.prototype as any).validateTrackingFields.bind(bare(null));
    expect(fn(null, '', '')).toBeNull();
    expect(fn(null, 'AWB1', '')).toBeNull();
    expect(fn(null, '', 'https://track.example/1')).toBeNull();
    expect(fn(null, '', 'ftp://x')).toBe('adminUi.orders.errors.invalidTrackingUrl');
    expect(fn(null, '', 'not-a-url')).toBe('adminUi.orders.errors.invalidTrackingUrl');
  });
});
