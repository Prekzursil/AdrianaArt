import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-track-order-id — trackOrderId. */
describe('AdminOrdersComponent trackOrderId (golden WU)', () => {
  it('returns the order id', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    expect(cmp.trackOrderId(0, { id: 'ord-1' } as any)).toBe('ord-1');
    expect(cmp.trackOrderId(9, { id: 'ord-9' } as any)).toBe('ord-9');
  });
});
