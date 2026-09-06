import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-track-kanban-status — trackKanbanStatus. */
describe('AdminOrdersComponent trackKanbanStatus (golden WU)', () => {
  it('returns the status string', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    expect(cmp.trackKanbanStatus(0, 'paid' as any)).toBe('paid');
  });
});
