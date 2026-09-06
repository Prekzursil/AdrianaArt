import { signal } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-range-sales — rangeSales. */
describe('AdminDashboardComponent rangeSales (golden WU)', () => {
  function bare(summary: any, metric: 'gross' | 'net'): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      summary: signal(summary),
      salesMetric: signal(metric),
    });
    return cmp;
  }

  it('picks gross/net range sales or 0', () => {
    expect(bare(null, 'gross').rangeSales()).toBe(0);
    expect(
      bare({ gross_sales_range: 40, net_sales_range: 30 }, 'gross').rangeSales(),
    ).toBe(40);
    expect(
      bare({ gross_sales_range: 40, net_sales_range: 30 }, 'net').rangeSales(),
    ).toBe(30);
  });
});
