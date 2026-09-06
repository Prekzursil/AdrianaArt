import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-density-toggle-label — densityToggleLabelKey. */
describe('AdminOrdersComponent densityToggleLabelKey (golden WU)', () => {
  it('returns the opposite density label key', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    (cmp as any).tableLayout = () => ({ density: 'compact' });
    expect(cmp.densityToggleLabelKey()).toBe('adminUi.tableLayout.densityToggle.toComfortable');
    (cmp as any).tableLayout = () => ({ density: 'comfortable' });
    expect(cmp.densityToggleLabelKey()).toBe('adminUi.tableLayout.densityToggle.toCompact');
  });
});
