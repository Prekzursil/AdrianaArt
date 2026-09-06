import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-open-stockouts -- openStockouts. */
describe('AdminDashboardComponent openStockouts (golden WU)', () => {
  it('delegates to openInventory()', () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, { openInventory: jasmine.createSpy('openInventory') });
    cmp.openStockouts();
    expect((cmp as any).openInventory).toHaveBeenCalled();
  });
});
