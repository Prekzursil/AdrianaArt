import { AdminComponent } from './admin.component';

/** Golden WU admin-filtered-orders — filteredOrders. */
describe('AdminComponent filteredOrders (golden WU)', () => {
  function createCmp(orders: Array<{ id: string; status: string }>, orderFilter: string | null) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).orders = orders;
    (cmp as any).orderFilter = orderFilter;
    return cmp;
  }

  it('returns all orders when filter empty, else status match', () => {
    const orders = [
      { id: '1', status: 'paid' },
      { id: '2', status: 'pending' },
      { id: '3', status: 'paid' },
    ];
    expect(createCmp(orders, null).filteredOrders().map((o) => o.id)).toEqual(['1', '2', '3']);
    expect(createCmp(orders, '').filteredOrders().map((o) => o.id)).toEqual(['1', '2', '3']);
    expect(createCmp(orders, 'paid').filteredOrders().map((o) => o.id)).toEqual(['1', '3']);
    expect(createCmp(orders, 'shipped').filteredOrders()).toEqual([]);
  });
});
