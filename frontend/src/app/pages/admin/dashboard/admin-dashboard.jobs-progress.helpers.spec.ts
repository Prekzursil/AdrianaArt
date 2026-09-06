import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-jobs-progress-helpers. */
describe('AdminDashboardComponent jobs/progress helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      auth: {
        canAccessAdminSection: jasmine.createSpy('canAccessAdminSection').and.returnValue(false),
        isAdmin: () => false,
      },
      ...overrides,
    });
    return cmp;
  }

  it('shouldShowJobsPanel true when users or coupons accessible', () => {
    expect(bare().shouldShowJobsPanel()).toBe(false);
    const cmp = bare({
      auth: {
        canAccessAdminSection: (s: string) => s === 'users',
        isAdmin: () => false,
      },
    });
    expect(cmp.shouldShowJobsPanel()).toBe(true);
  });

  it('canManageGdprJobs / canManageCouponJobs gate on auth', () => {
    expect(bare().canManageGdprJobs()).toBe(false);
    expect(bare({ auth: { canAccessAdminSection: () => false, isAdmin: () => true } }).canManageGdprJobs()).toBe(
      true,
    );
    const cmp = bare({
      auth: {
        canAccessAdminSection: jasmine.createSpy('canAccessAdminSection').and.callFake((s: string) => s === 'coupons'),
        isAdmin: () => false,
      },
    });
    expect(cmp.canManageCouponJobs()).toBe(true);
    expect((cmp as any).auth.canAccessAdminSection).toHaveBeenCalledWith('coupons');
  });

  it('progressPct clamps; couponProgressPct uses processed/total', () => {
    const cmp = bare();
    expect(cmp.progressPct(-5)).toBe(0);
    expect(cmp.progressPct(40)).toBe(40);
    expect(cmp.progressPct(150)).toBe(100);
    expect(cmp.progressPct('nope')).toBe(0);
    expect(cmp.couponProgressPct({ processed: 25, total_candidates: 100 } as any)).toBe(25);
    expect(cmp.couponProgressPct({ processed: 1, total_candidates: 0 } as any)).toBe(0);
  });
});
