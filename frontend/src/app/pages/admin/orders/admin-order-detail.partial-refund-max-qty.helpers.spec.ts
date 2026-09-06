import { AdminOrderDetailComponent } from './admin-order-detail.component';

describe('AdminOrderDetailComponent partialRefundMaxQty (golden WU)', () => {
  it('returns remaining qty after already-refunded', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).partialRefundAlreadyRefundedQty = (id: string) => (id === 'a' ? 2 : 0);
    expect(cmp.partialRefundMaxQty({ id: 'a', quantity: 5 } as any)).toBe(3);
    expect(cmp.partialRefundMaxQty({ id: 'b', quantity: 1 } as any)).toBe(1);
    expect(cmp.partialRefundMaxQty({ id: 'a', quantity: 2 } as any)).toBe(0);
    expect(cmp.partialRefundMaxQty({ id: 'a', quantity: 1 } as any)).toBe(0);
  });
});
