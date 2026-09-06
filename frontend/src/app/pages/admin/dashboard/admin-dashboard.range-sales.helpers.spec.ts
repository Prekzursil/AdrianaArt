import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU tip — rangeSales. */
describe('AdminDashboardComponent rangeSales (golden WU)', () => {
  it('picks gross/net range sales', () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).summary = () => null;
    (cmp as any).salesMetric = () => 'gross';
    expect(cmp.rangeSales()).toBe(0);
    (cmp as any).summary = () => ({ gross_sales_range: 100, net_sales_range: 80 });
    expect(cmp.rangeSales()).toBe(100);
    (cmp as any).salesMetric = () => 'net';
    expect(cmp.rangeSales()).toBe(80);
  });
});
