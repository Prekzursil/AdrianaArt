import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU tip — channelSales. */
describe('AdminDashboardComponent channelSales (golden WU)', () => {
  it('picks gross/net channel sales with numeric coercion', () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).salesMetric = () => 'gross';
    expect(cmp.channelSales({ gross_sales: 5, net_sales: 2 })).toBe(5);
    (cmp as any).salesMetric = () => 'net';
    expect(cmp.channelSales({ gross_sales: 5, net_sales: 2 })).toBe(2);
    expect(cmp.channelSales({} as any)).toBe(0);
  });
});
