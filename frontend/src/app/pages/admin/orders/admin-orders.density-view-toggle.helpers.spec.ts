import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-density-view-toggle-helpers. */
describe('AdminOrdersComponent density/view toggle helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminOrdersComponent {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, {
      tableLayout: () => ({ density: 'comfortable' }),
      viewMode: () => 'table',
      ...overrides,
    });
    return cmp;
  }

  it('densityToggleLabelKey flips between compact and comfortable keys', () => {
    expect(bare().densityToggleLabelKey()).toBe('adminUi.tableLayout.densityToggle.toCompact');
    expect(
      bare({ tableLayout: () => ({ density: 'compact' }) }).densityToggleLabelKey(),
    ).toBe('adminUi.tableLayout.densityToggle.toComfortable');
  });

  it('viewToggleLabelKey flips between table and kanban keys', () => {
    expect(bare().viewToggleLabelKey()).toBe('adminUi.orders.viewMode.kanban');
    expect(bare({ viewMode: () => 'kanban' }).viewToggleLabelKey()).toBe(
      'adminUi.orders.viewMode.table',
    );
  });
});
