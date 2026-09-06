import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-track-column-id — trackColumnId. */
describe('AdminOrdersComponent trackColumnId (golden WU)', () => {
  it('returns the column id', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    expect(cmp.trackColumnId(0, 'status')).toBe('status');
    expect(cmp.trackColumnId(3, 'tags')).toBe('tags');
  });
});
