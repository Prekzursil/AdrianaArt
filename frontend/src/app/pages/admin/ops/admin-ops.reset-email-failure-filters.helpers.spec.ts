import { AdminOpsComponent } from './admin-ops.component';

/** Golden WU ops-reset-email-failure-filters -- resetEmailFailureFilters. */
describe('AdminOpsComponent resetEmailFailureFilters (golden WU)', () => {
  it('clears to/sinceHours defaults and reloads', () => {
    const cmp = Object.create(AdminOpsComponent.prototype) as AdminOpsComponent;
    Object.assign(cmp as any, {
      emailFailuresTo: 'x',
      emailFailuresSinceHours: 6,
      loadEmailFailures: jasmine.createSpy('loadEmailFailures'),
    });
    cmp.resetEmailFailureFilters();
    expect((cmp as any).emailFailuresTo).toBe('');
    expect((cmp as any).emailFailuresSinceHours).toBe(24);
    expect((cmp as any).loadEmailFailures).toHaveBeenCalled();
  });
});
