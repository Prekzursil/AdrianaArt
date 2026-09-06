import { orderStatusChipClass } from './order-status';

describe('orderStatusChipClass (golden WU)', () => {
  it('maps known statuses; unknown falls back to refunded styles', () => {
    expect(orderStatusChipClass('paid')).toContain('indigo');
    expect(orderStatusChipClass('pending')).toContain('amber');
    expect(orderStatusChipClass('delivered')).toContain('emerald');
    expect(orderStatusChipClass('cancelled')).toContain('rose');
    const fallback = orderStatusChipClass('weird');
    expect(fallback).toBe(orderStatusChipClass('refunded'));
  });
});
