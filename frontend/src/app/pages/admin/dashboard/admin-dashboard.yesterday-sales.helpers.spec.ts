import { signal } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-yesterday-sales — yesterdaySales. */
describe('AdminDashboardComponent yesterdaySales (golden WU)', () => {
  function bare(summary: any, metric: 'gross' | 'net'): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      summary: signal(summary),
      salesMetric: signal(metric),
    });
    return cmp;
  }

  it('picks gross/net yesterday sales or 0', () => {
    expect(bare(null, 'gross').yesterdaySales()).toBe(0);
    expect(
      bare({ gross_yesterday_sales: 10, net_yesterday_sales: 7 }, 'gross').yesterdaySales(),
    ).toBe(10);
    expect(
      bare({ gross_yesterday_sales: 10, net_yesterday_sales: 7 }, 'net').yesterdaySales(),
    ).toBe(7);
  });
});
