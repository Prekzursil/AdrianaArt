import { AdminOrderDetailComponent } from './admin-order-detail.component';

describe('AdminOrderDetailComponent refundBreakdown (golden WU)', () => {
  it('returns null without order; otherwise splits totals', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).order = () => null;
    expect(cmp.refundBreakdown()).toBeNull();
    (cmp as any).order = () => ({
      total_amount: 130,
      shipping_amount: 20,
      tax_amount: 10,
      fee_amount: 5,
    });
    expect(cmp.refundBreakdown()).toEqual({
      subtotal: 95,
      shipping: 20,
      vat: 10,
      fee: 5,
      total: 130,
    });
    (cmp as any).order = () => ({
      total_amount: 10,
      shipping_amount: 20,
      tax_amount: 0,
      fee_amount: 0,
    });
    expect(cmp.refundBreakdown()?.subtotal).toBe(0);
  });
});
