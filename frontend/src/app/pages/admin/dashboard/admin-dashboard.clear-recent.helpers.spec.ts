import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-clear-recent — clearRecent. */
describe('AdminDashboardComponent clearRecent (golden WU)', () => {
  it('delegates to recent.clear', () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    let cleared = 0;
    Object.assign(cmp as any, { recent: { clear: () => { cleared += 1; } } });
    cmp.clearRecent();
    expect(cleared).toBe(1);
  });
});
