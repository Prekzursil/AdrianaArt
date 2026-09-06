import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU tip — refundsTotal. */
describe('AdminOrderDetailComponent refundsTotal (golden WU)', () => {
  it('sums refund amounts; empty/missing => 0', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).order = () => null;
    expect(cmp.refundsTotal()).toBe(0);
    (cmp as any).order = () => ({ refunds: [] });
    expect(cmp.refundsTotal()).toBe(0);
    (cmp as any).order = () => ({ refunds: [{ amount: 10 }, { amount: '2.5' }, {}] });
    expect(cmp.refundsTotal()).toBe(12.5);
  });
});
