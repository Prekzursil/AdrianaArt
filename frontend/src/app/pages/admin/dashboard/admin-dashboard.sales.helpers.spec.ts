import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU admin-dashboard-sales-helpers. */
describe('AdminDashboardComponent sales helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      summary: () => null,
      salesMetric: () => 'gross',
      ...overrides,
    });
    return cmp;
  }

  it('todaySales / yesterdaySales pick gross vs net', () => {
    const cmp = bare({
      summary: () => ({
        gross_today_sales: 10,
        net_today_sales: 7,
        gross_yesterday_sales: 9,
        net_yesterday_sales: 4,
      }),
    });
    expect(cmp.todaySales()).toBe(10);
    expect(cmp.yesterdaySales()).toBe(9);
    (cmp as any).salesMetric = () => 'net';
    expect(cmp.todaySales()).toBe(7);
    expect(cmp.yesterdaySales()).toBe(4);
    expect(bare().todaySales()).toBe(0);
  });

  it('salesDeltaPct returns null without summary', () => {
    expect(bare().salesDeltaPct()).toBeNull();
    const cmp = bare({
      summary: () => ({ gross_sales_delta_pct: 12.5, net_sales_delta_pct: -3 }),
    });
    expect(cmp.salesDeltaPct()).toBe(12.5);
    (cmp as any).salesMetric = () => 'net';
    expect(cmp.salesDeltaPct()).toBe(-3);
  });

  it('rangeSales / channelSales honor salesMetric', () => {
    const cmp = bare({
      summary: () => ({ gross_sales_range: 100, net_sales_range: 80 }),
    });
    expect(cmp.rangeSales()).toBe(100);
    (cmp as any).salesMetric = () => 'net';
    expect(cmp.rangeSales()).toBe(80);
    expect(cmp.channelSales({ gross_sales: 5, net_sales: 2 })).toBe(2);
    (cmp as any).salesMetric = () => 'gross';
    expect(cmp.channelSales({ gross_sales: 5, net_sales: 2 })).toBe(5);
  });

  it('formatChannelKey trims and replaces underscores', () => {
    const cmp = bare();
    expect(cmp.formatChannelKey('online_store')).toBe('online store');
    expect(cmp.formatChannelKey('')).toBe('—');
    expect(cmp.formatChannelKey('  pos  ')).toBe('pos');
  });
});
