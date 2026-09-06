import { AdminOrdersComponent } from './admin-orders.component';
import { adminTableCellPaddingClass } from '../shared/admin-table-layout';

/** Golden WU admin-orders-cell-padding-class -- cellPaddingClass. */
describe('AdminOrdersComponent cellPaddingClass (golden WU)', () => {
  it('maps table density through adminTableCellPaddingClass', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, {
      tableLayout: jasmine.createSpy('tableLayout').and.returnValue({ density: 'compact' }),
    });
    expect(cmp.cellPaddingClass()).toBe(adminTableCellPaddingClass('compact' as any));
  });
});
