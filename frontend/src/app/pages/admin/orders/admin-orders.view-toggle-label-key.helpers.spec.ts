import { signal } from '@angular/core';
import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-view-toggle-label-key — viewToggleLabelKey. */
describe('AdminOrdersComponent viewToggleLabelKey (golden WU)', () => {
  function bare(mode: 'table' | 'kanban'): AdminOrdersComponent {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, { viewMode: signal(mode) });
    return cmp;
  }

  it('offers the opposite view mode label key', () => {
    expect(bare('kanban').viewToggleLabelKey()).toBe('adminUi.orders.viewMode.table');
    expect(bare('table').viewToggleLabelKey()).toBe('adminUi.orders.viewMode.kanban');
  });
});
