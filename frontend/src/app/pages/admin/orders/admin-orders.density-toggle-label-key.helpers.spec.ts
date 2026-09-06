import { signal } from '@angular/core';
import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-density-toggle-label-key — densityToggleLabelKey. */
describe('AdminOrdersComponent densityToggleLabelKey (golden WU)', () => {
  function bare(density: 'compact' | 'comfortable'): AdminOrdersComponent {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, { tableLayout: signal({ density }) });
    return cmp;
  }

  it('flips label by density', () => {
    expect(bare('compact').densityToggleLabelKey()).toBe(
      'adminUi.tableLayout.densityToggle.toComfortable',
    );
    expect(bare('comfortable').densityToggleLabelKey()).toBe(
      'adminUi.tableLayout.densityToggle.toCompact',
    );
  });
});
