import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-should-show-jobs-panel — shouldShowJobsPanel. */
describe('AdminDashboardComponent shouldShowJobsPanel (golden WU)', () => {
  function bare(sections: string[]): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      auth: { canAccessAdminSection: (s: string) => sections.includes(s) },
    });
    return cmp;
  }

  it('shows when users or coupons access exists', () => {
    expect(bare([]).shouldShowJobsPanel()).toBe(false);
    expect(bare(['users']).shouldShowJobsPanel()).toBe(true);
    expect(bare(['coupons']).shouldShowJobsPanel()).toBe(true);
    expect(bare(['orders']).shouldShowJobsPanel()).toBe(false);
  });
});
