import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-kanban-total-cards — kanbanTotalCards. */
describe('AdminOrdersComponent kanbanTotalCards (golden WU)', () => {
  it('sums lengths across kanbanColumnStatuses', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    (cmp as any).kanbanColumnStatuses = () => ['paid', 'shipped', 'delivered'];
    (cmp as any).kanbanItemsByStatus = () => ({
      paid: [{}, {}],
      shipped: [{}],
      delivered: undefined,
    });
    expect(cmp.kanbanTotalCards()).toBe(3);
  });
});
