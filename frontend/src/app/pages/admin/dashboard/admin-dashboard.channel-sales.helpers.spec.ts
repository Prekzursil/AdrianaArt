import { signal } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-channel-sales — channelSales. */
describe('AdminDashboardComponent channelSales (golden WU)', () => {
  function bare(metric: 'gross' | 'net'): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, { salesMetric: signal(metric) });
    return cmp;
  }

  it('selects gross or net row sales', () => {
    const row = { gross_sales: 12, net_sales: 9 };
    expect(bare('gross').channelSales(row)).toBe(12);
    expect(bare('net').channelSales(row)).toBe(9);
    expect(bare('gross').channelSales(null as any)).toBe(0);
  });
});
