import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-delta-label — deltaLabel. */
describe('AdminDashboardComponent deltaLabel (golden WU)', () => {
  it('formats signed percents and empty fallback', () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    expect(cmp.deltaLabel(null)).toBe('—');
    expect(cmp.deltaLabel(undefined)).toBe('—');
    expect(cmp.deltaLabel(1.26)).toBe('+1.3%');
    expect(cmp.deltaLabel(-2.04)).toBe('-2%');
    expect(cmp.deltaLabel(0)).toBe('0%');
  });
});
