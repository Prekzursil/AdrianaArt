import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU tip — partialRefundQtyFor. */
describe('AdminOrderDetailComponent partialRefundQtyFor (golden WU)', () => {
  it('reads qty map with numeric coercion', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).partialRefundQty = { a: 2, b: '3' };
    expect(cmp.partialRefundQtyFor('a')).toBe(2);
    expect(cmp.partialRefundQtyFor('b')).toBe(3);
    expect(cmp.partialRefundQtyFor('missing')).toBe(0);
    (cmp as any).partialRefundQty = null;
    expect(cmp.partialRefundQtyFor('a')).toBe(0);
  });
});
