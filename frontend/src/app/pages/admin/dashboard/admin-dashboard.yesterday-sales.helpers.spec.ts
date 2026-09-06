import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU tip — yesterdaySales. */
describe('AdminDashboardComponent yesterdaySales (golden WU)', () => {
  it('picks gross/net yesterday from summary', () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).summary = () => null;
    (cmp as any).salesMetric = () => 'gross';
    expect(cmp.yesterdaySales()).toBe(0);
    (cmp as any).summary = () => ({ gross_yesterday_sales: 9, net_yesterday_sales: 4 });
    expect(cmp.yesterdaySales()).toBe(9);
    (cmp as any).salesMetric = () => 'net';
    expect(cmp.yesterdaySales()).toBe(4);
  });
});
