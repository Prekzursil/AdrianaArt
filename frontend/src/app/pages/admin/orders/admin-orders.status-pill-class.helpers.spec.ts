import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-status-pill-class — statusPillClass. */
describe('AdminOrdersComponent statusPillClass (golden WU)', () => {
  function createCmp() {
    return Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
  }

  it('maps known statuses and falls back', () => {
    const cmp = createCmp();
    expect(cmp.statusPillClass('paid')).toContain('indigo');
    expect(cmp.statusPillClass('delivered')).toContain('emerald');
    expect(cmp.statusPillClass('unknown-status')).toContain('slate');
  });
});
