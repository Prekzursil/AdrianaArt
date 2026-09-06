import { AdminOpsComponent } from './admin-ops.component';

/** Golden WU ops-status-badge-helpers. */
describe('AdminOpsComponent status/badge helpers (golden WU)', () => {
  function bare(): AdminOpsComponent {
    return Object.create(AdminOpsComponent.prototype) as AdminOpsComponent;
  }

  it('bannerStatus classifies active/scheduled/expired/disabled', () => {
    const cmp = bare();
    const now = Date.now();
    expect(
      cmp.bannerStatus({
        is_active: false,
        starts_at: new Date(now - 1000).toISOString(),
        ends_at: null,
      } as any),
    ).toBe('disabled');
    expect(
      cmp.bannerStatus({
        is_active: true,
        starts_at: new Date(now + 60_000).toISOString(),
        ends_at: null,
      } as any),
    ).toBe('scheduled');
    expect(
      cmp.bannerStatus({
        is_active: true,
        starts_at: new Date(now - 60_000).toISOString(),
        ends_at: new Date(now - 1000).toISOString(),
      } as any),
    ).toBe('expired');
    expect(
      cmp.bannerStatus({
        is_active: true,
        starts_at: new Date(now - 60_000).toISOString(),
        ends_at: null,
      } as any),
    ).toBe('active');
  });

  it('diagnosticsBadgeClass and webhookStatusClasses map statuses to classes', () => {
    const cmp = bare();
    expect(cmp.diagnosticsBadgeClass('ok')).toContain('emerald');
    expect(cmp.diagnosticsBadgeClass('warning')).toContain('amber');
    expect(cmp.diagnosticsBadgeClass('error')).toContain('rose');
    expect(cmp.diagnosticsBadgeClass('other')).toContain('slate');
    expect(cmp.webhookStatusClasses('failed')).toContain('rose');
    expect(cmp.webhookStatusClasses('processed')).toContain('emerald');
    expect(cmp.webhookStatusClasses('queued')).toContain('slate');
  });
});
