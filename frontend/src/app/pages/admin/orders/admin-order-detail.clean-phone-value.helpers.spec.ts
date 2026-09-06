import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU admin-order-detail-clean-phone-value -- cleanPhoneValue. */
describe('AdminOrderDetailComponent cleanPhoneValue (golden WU)', () => {
  it('strips formatting and normalizes 00 to plus', () => {
    const cmp = Object.create(
      AdminOrderDetailComponent.prototype,
    ) as AdminOrderDetailComponent;
    expect((cmp as any).cleanPhoneValue(null)).toBe('');
    expect((cmp as any).cleanPhoneValue('  +40 (721) 123-456  ')).toBe('+40721123456');
    expect((cmp as any).cleanPhoneValue('0040721123456')).toBe('+40721123456');
    expect((cmp as any).cleanPhoneValue('0721-123.456')).toBe('0721123456');
  });
});
