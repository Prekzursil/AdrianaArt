import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-clear-selection — clearSelection. */
describe('AdminOrdersComponent clearSelection (golden WU)', () => {
  it('empties selectedIds', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, { selectedIds: new Set(['o1', 'o2']) });
    cmp.clearSelection();
    expect((cmp as any).selectedIds.size).toBe(0);
  });
});
