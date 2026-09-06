import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-build-summary-params — buildSummaryParams. */
describe('AdminDashboardComponent buildSummaryParams (golden WU)', () => {
  it('builds custom range or days params', () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    const fn = (AdminDashboardComponent.prototype as any).buildSummaryParams as (
      this: AdminDashboardComponent,
    ) => { range_days?: number; range_from?: string; range_to?: string } | undefined;

    (cmp as any).rangePreset = 'custom';
    (cmp as any).rangeFrom = '';
    (cmp as any).rangeTo = '2026-01-02';
    expect(fn.call(cmp)).toBeUndefined();

    (cmp as any).rangeFrom = '2026-01-01';
    (cmp as any).rangeTo = '2026-01-02';
    expect(fn.call(cmp)).toEqual({ range_from: '2026-01-01', range_to: '2026-01-02' });

    (cmp as any).rangePreset = '7';
    expect(fn.call(cmp)).toEqual({ range_days: 7 });

    (cmp as any).rangePreset = '0';
    expect(fn.call(cmp)).toBeUndefined();
  });
});
