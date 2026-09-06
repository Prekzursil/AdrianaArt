import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU tip — progressPct. */
describe('AdminDashboardComponent progressPct (golden WU)', () => {
  it('clamps finite percents into 0..100', () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    expect(cmp.progressPct(50)).toBe(50);
    expect(cmp.progressPct(-10)).toBe(0);
    expect(cmp.progressPct(150)).toBe(100);
    expect(cmp.progressPct('nope')).toBe(0);
    expect(cmp.progressPct(null)).toBe(0);
  });
});
