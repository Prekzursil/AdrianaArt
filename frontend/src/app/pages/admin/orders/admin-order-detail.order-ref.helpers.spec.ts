import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-order-ref — orderRef. */
describe('AdminOrderDetailComponent orderRef (golden WU)', () => {
  it('prefers reference_code else first 8 of id', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).order = () => null;
    expect(cmp.orderRef()).toBe('');
    (cmp as any).order = () => ({ reference_code: 'MS-100', id: 'abcdefghijkl' });
    expect(cmp.orderRef()).toBe('MS-100');
    (cmp as any).order = () => ({ reference_code: '', id: 'abcdefghijkl' });
    expect(cmp.orderRef()).toBe('abcdefgh');
  });
});
