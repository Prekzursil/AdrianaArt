import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU admin-orders-close-tag-manager -- closeTagManager. */
describe('AdminOrdersComponent closeTagManager (golden WU)', () => {
  it('closes modal state and clears query/rows/errors', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    const open = { set: jasmine.createSpy('openSet') };
    const err = { set: jasmine.createSpy('errSet') };
    const rows = { set: jasmine.createSpy('rowsSet') };
    Object.assign(cmp as any, {
      tagManagerOpen: open,
      tagManagerError: err,
      tagManagerRows: rows,
      tagManagerQuery: 'vip',
      tagRenameError: 'boom',
    });
    cmp.closeTagManager();
    expect(open.set).toHaveBeenCalledWith(false);
    expect(err.set).toHaveBeenCalledWith(null);
    expect(rows.set).toHaveBeenCalledWith([]);
    expect((cmp as any).tagManagerQuery).toBe('');
    expect((cmp as any).tagRenameError).toBe('');
  });
});
