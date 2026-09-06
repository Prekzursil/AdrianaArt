import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU tip — salesDeltaPct. */
describe('AdminDashboardComponent salesDeltaPct (golden WU)', () => {
  it('returns null without summary; else gross/net delta', () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    (cmp as any).summary = () => null;
    (cmp as any).salesMetric = () => 'gross';
    expect(cmp.salesDeltaPct()).toBeNull();
    (cmp as any).summary = () => ({ gross_sales_delta_pct: 12.5, net_sales_delta_pct: -3 });
    expect(cmp.salesDeltaPct()).toBe(12.5);
    (cmp as any).salesMetric = () => 'net';
    expect(cmp.salesDeltaPct()).toBe(-3);
  });
});
