import { orderStatusChipClass } from './order-status';

/** Golden WU order-status-chip-class -- orderStatusChipClass. */
describe('orderStatusChipClass (golden WU)', () => {
  it('maps known statuses and falls back to refunded styles', () => {
    expect(orderStatusChipClass('paid')).toContain('indigo');
    expect(orderStatusChipClass('delivered')).toContain('emerald');
    expect(orderStatusChipClass('nope')).toContain('slate');
  });
});
