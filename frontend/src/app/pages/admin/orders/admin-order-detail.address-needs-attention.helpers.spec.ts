import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-address-needs-attention — addressNeedsAttention. */
describe('AdminOrderDetailComponent addressNeedsAttention (golden WU)', () => {
  it('is true when addressIssueKeys is non-empty', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).addressIssueKeys = () => [];
    expect(cmp.addressNeedsAttention({} as any, 'shipping')).toBe(false);
    (cmp as any).addressIssueKeys = () => ['adminUi.orders.addressValidate.phoneMissing'];
    expect(cmp.addressNeedsAttention({} as any, 'shipping')).toBe(true);
  });
});
