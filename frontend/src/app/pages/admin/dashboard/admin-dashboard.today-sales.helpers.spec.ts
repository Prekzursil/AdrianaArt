import { signal } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-today-sales — todaySales. */
describe('AdminDashboardComponent todaySales (golden WU)', () => {
  function bare(metric: string, summary: any): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      salesMetric: signal(metric),
      summary: signal(summary),
    });
    return cmp;
  }

  it('returns 0 without summary and switches gross/net', () => {
    expect(bare('gross', null).todaySales()).toBe(0);
    expect(
      bare('gross', { gross_today_sales: 12, net_today_sales: 9 }).todaySales(),
    ).toBe(12);
    expect(
      bare('net', { gross_today_sales: 12, net_today_sales: 9 }).todaySales(),
    ).toBe(9);
  });
});
