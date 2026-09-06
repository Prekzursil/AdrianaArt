import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU tip — todaySales. */
describe('AdminDashboardComponent todaySales (golden WU)', () => {
  it('picks gross/net today from summary', () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).summary = () => null;
    (cmp as any).salesMetric = () => 'gross';
    expect(cmp.todaySales()).toBe(0);
    (cmp as any).summary = () => ({ gross_today_sales: 10, net_today_sales: 7 });
    expect(cmp.todaySales()).toBe(10);
    (cmp as any).salesMetric = () => 'net';
    expect(cmp.todaySales()).toBe(7);
  });
});
