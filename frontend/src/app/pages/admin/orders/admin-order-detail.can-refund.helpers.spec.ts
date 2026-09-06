import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-can-refund — canRefund. */
describe('AdminOrderDetailComponent canRefund (golden WU)', () => {
  it('allows refund only for paid/shipped/delivered', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    for (const status of ['paid', 'shipped', 'delivered', 'PAID']) {
      (cmp as any).order = () => ({ status });
      expect(cmp.canRefund()).toBe(true);
    }
    for (const status of ['pending', 'cancelled', '', null]) {
      (cmp as any).order = () => ({ status });
      expect(cmp.canRefund()).toBe(false);
    }
    (cmp as any).order = () => null;
    expect(cmp.canRefund()).toBe(false);
  });
});
