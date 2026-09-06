import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU admin-orders-open-tag-manager -- openTagManager. */
describe('AdminOrdersComponent openTagManager (golden WU)', () => {
  it('opens modal, clears rename state, and reloads rows', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, {
      tagManagerOpen: { set: jasmine.createSpy('openSet') },
      tagManagerError: { set: jasmine.createSpy('errSet') },
      tagRenameError: 'boom',
      tagRenameFrom: 'a',
      tagRenameTo: 'b',
      reloadTagManager: jasmine.createSpy('reload'),
    });
    cmp.openTagManager();
    expect((cmp as any).tagManagerOpen.set).toHaveBeenCalledWith(true);
    expect((cmp as any).tagManagerError.set).toHaveBeenCalledWith(null);
    expect((cmp as any).tagRenameError).toBe('');
    expect((cmp as any).tagRenameFrom).toBe('');
    expect((cmp as any).tagRenameTo).toBe('');
    expect((cmp as any).reloadTagManager).toHaveBeenCalled();
  });
});
