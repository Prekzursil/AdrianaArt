import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-selected-export-columns — selectedExportColumns. */
describe('AdminOrdersComponent selectedExportColumns (golden WU)', () => {
  it('filters exportColumnOptions by exportColumns flags', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as any;
    Object.assign(cmp, {
      exportColumnOptions: ['id', 'email', 'total'],
      exportColumns: { id: true, email: false, total: true },
    });
    expect(cmp.selectedExportColumns()).toEqual(['id', 'total']);
  });
});
