import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-kanban-column-statuses — kanbanColumnStatuses. */
describe('AdminOrdersComponent kanbanColumnStatuses (golden WU)', () => {
  function createCmp(status: string) {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    (cmp as any).status = status;
    return cmp;
  }

  it('returns pending, sales, all, and single-status columns', () => {
    expect(createCmp('pending').kanbanColumnStatuses()).toEqual([
      'pending_payment',
      'pending_acceptance',
    ]);
    expect(createCmp('sales').kanbanColumnStatuses()).toEqual([
      'paid',
      'shipped',
      'delivered',
      'refunded',
    ]);
    expect(createCmp('all').kanbanColumnStatuses()).toEqual([
      'pending_payment',
      'pending_acceptance',
      'paid',
      'shipped',
      'delivered',
      'cancelled',
      'refunded',
    ]);
    expect(createCmp('shipped').kanbanColumnStatuses()).toEqual(['shipped']);
  });
});
