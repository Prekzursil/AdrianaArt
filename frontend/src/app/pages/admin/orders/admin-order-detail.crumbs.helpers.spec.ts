import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-crumbs — crumbs. */
describe('AdminOrderDetailComponent crumbs (golden WU)', () => {
  it('builds breadcrumb trail with optional order ref', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).translate = { instant: (k: string) => k };
    (cmp as any).orderRef = () => '';
    const emptyRef = cmp.crumbs();
    expect(emptyRef[0]).toEqual({ label: 'nav.home', url: '/' });
    expect(emptyRef[3].label).toBe('adminUi.orders.detailTitle');
    (cmp as any).orderRef = () => 'MS-9';
    expect(cmp.crumbs()[3].label).toBe('adminUi.orders.detailTitle: MS-9');
  });
});
