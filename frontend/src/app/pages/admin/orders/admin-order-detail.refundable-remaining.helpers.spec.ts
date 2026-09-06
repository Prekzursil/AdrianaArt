import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU tip — refundableRemaining. */
describe('AdminOrderDetailComponent refundableRemaining (golden WU)', () => {
  it('clamps total_amount minus refundsTotal to >= 0', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).refundsTotal = () => 30;
    (cmp as any).order = () => ({ total_amount: 100 });
    expect(cmp.refundableRemaining()).toBe(70);
    (cmp as any).order = () => ({ total_amount: 10 });
    expect(cmp.refundableRemaining()).toBe(0);
    (cmp as any).order = () => null;
    expect(cmp.refundableRemaining()).toBe(0);
  });
});
