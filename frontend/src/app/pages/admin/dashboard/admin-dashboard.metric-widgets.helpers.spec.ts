import { signal } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-metric-widgets — metricWidgets. */
describe('AdminDashboardComponent metricWidgets (golden WU)', () => {
  function bare(order: string[]): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, { metricWidgetOrder: signal(order) });
    return cmp;
  }

  it('returns metricWidgetOrder', () => {
    expect(bare(['kpis', 'counts']).metricWidgets()).toEqual(['kpis', 'counts']);
    expect(bare([]).metricWidgets()).toEqual([]);
  });
});
