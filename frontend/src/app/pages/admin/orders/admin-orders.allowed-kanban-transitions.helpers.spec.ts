import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-allowed-kanban-transitions — allowedKanbanTransitions. */
describe('AdminOrdersComponent allowedKanbanTransitions (golden WU)', () => {
  it('returns base transitions and COD extras', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    const fn = (AdminOrdersComponent.prototype as any).allowedKanbanTransitions as (
      this: AdminOrdersComponent,
      order: { status?: string; payment_method?: string },
    ) => string[];
    expect(fn.call(cmp, { status: 'paid' })).toEqual(['shipped', 'refunded', 'cancelled']);
    expect(fn.call(cmp, { status: 'cancelled' })).toEqual([]);
    expect(fn.call(cmp, { status: 'pending_acceptance', payment_method: 'cod' }).sort()).toEqual(
      ['cancelled', 'delivered', 'paid', 'shipped'].sort(),
    );
  });
});
