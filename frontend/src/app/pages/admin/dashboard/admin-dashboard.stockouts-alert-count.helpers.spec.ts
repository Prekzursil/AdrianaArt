import { signal } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-stockouts-alert-count — stockoutsAlertCount. */
describe('AdminDashboardComponent stockoutsAlertCount (golden WU)', () => {
  function bare(stockouts: any): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      summary: signal(stockouts === undefined ? null : { anomalies: { stockouts } }),
    });
    return cmp;
  }

  it('returns count only when alerting with positive count', () => {
    expect(bare(undefined).stockoutsAlertCount()).toBeNull();
    expect(bare({ count: 0 }).stockoutsAlertCount()).toBeNull();
    expect(bare({ count: 3 }).stockoutsAlertCount()).toBe(3);
    expect(bare({ count: 3, is_alert: false }).stockoutsAlertCount()).toBeNull();
    expect(bare({ count: 2, is_alert: true }).stockoutsAlertCount()).toBe(2);
  });
});
