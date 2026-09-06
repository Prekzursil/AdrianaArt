import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU tip — partialRefundLineTotal. */
describe('AdminOrderDetailComponent partialRefundLineTotal (golden WU)', () => {
  it('multiplies qty by unit_price with floor at 0', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).partialRefundQtyFor = (id: string) => (id === 'i1' ? 3 : 0);
    expect(cmp.partialRefundLineTotal({ id: 'i1', unit_price: 4 } as any)).toBe(12);
    expect(cmp.partialRefundLineTotal({ id: 'i2', unit_price: 9 } as any)).toBe(0);
    (cmp as any).partialRefundQtyFor = () => 2;
    expect(cmp.partialRefundLineTotal({ id: 'x', unit_price: -5 } as any)).toBe(0);
  });
});
