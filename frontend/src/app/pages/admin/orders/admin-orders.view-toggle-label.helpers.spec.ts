import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-view-toggle-label — viewToggleLabelKey. */
describe('AdminOrdersComponent viewToggleLabelKey (golden WU)', () => {
  it('returns the opposite view mode label key', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    (cmp as any).viewMode = () => 'kanban';
    expect(cmp.viewToggleLabelKey()).toBe('adminUi.orders.viewMode.table');
    (cmp as any).viewMode = () => 'table';
    expect(cmp.viewToggleLabelKey()).toBe('adminUi.orders.viewMode.kanban');
  });
});
