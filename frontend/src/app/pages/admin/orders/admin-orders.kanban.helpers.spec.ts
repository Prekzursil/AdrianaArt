import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-kanban-helpers. */
describe('AdminOrdersComponent kanban helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminOrdersComponent {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, {
      status: 'paid',
      kanbanItemsByStatus: () => ({}),
      ...overrides,
    });
    return cmp;
  }

  it('kanbanColumnStatuses maps filter buckets to columns', () => {
    expect(bare({ status: 'pending' }).kanbanColumnStatuses()).toEqual([
      'pending_payment',
      'pending_acceptance',
    ]);
    expect(bare({ status: 'sales' }).kanbanColumnStatuses()).toEqual([
      'paid',
      'shipped',
      'delivered',
      'refunded',
    ]);
    expect(bare({ status: 'all' }).kanbanColumnStatuses()).toEqual([
      'pending_payment',
      'pending_acceptance',
      'paid',
      'shipped',
      'delivered',
      'cancelled',
      'refunded',
    ]);
    expect(bare({ status: 'shipped' }).kanbanColumnStatuses()).toEqual(['shipped']);
  });

  it('trackKanbanStatus returns the status id', () => {
    expect(bare().trackKanbanStatus(0, 'paid' as any)).toBe('paid');
  });

  it('kanbanTotalCards sums column lengths', () => {
    const cmp = bare({
      status: 'sales',
      kanbanItemsByStatus: () => ({
        paid: [{ id: '1' }, { id: '2' }],
        shipped: [{ id: '3' }],
        delivered: [],
        refunded: [{ id: '4' }],
      }),
    });
    expect(cmp.kanbanTotalCards()).toBe(4);
  });
});
