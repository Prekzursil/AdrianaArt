import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU tip — partialRefundSelectionTotal. */
describe('AdminOrderDetailComponent partialRefundSelectionTotal (golden WU)', () => {
  it('sums partialRefundLineTotal across items', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).partialRefundLineTotal = (it: any) => Number(it.unit_price ?? 0);
    expect(cmp.partialRefundSelectionTotal({ items: [] } as any)).toBe(0);
    expect(
      cmp.partialRefundSelectionTotal({ items: [{ unit_price: 1 }, { unit_price: 2.5 }] } as any),
    ).toBe(3.5);
    expect(cmp.partialRefundSelectionTotal({} as any)).toBe(0);
  });
});
