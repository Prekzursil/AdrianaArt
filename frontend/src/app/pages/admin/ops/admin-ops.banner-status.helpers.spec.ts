import { AdminOpsComponent } from './admin-ops.component';

/** Golden WU ops-banner-status — bannerStatus. */
describe('AdminOpsComponent bannerStatus (golden WU)', () => {
  it('classifies disabled/scheduled/expired/active', () => {
    const cmp = Object.create(AdminOpsComponent.prototype) as AdminOpsComponent;
    const now = Date.now();
    expect(cmp.bannerStatus({ is_active: false } as any)).toBe('disabled');
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
        starts_at: new Date(now - 120_000).toISOString(),
        ends_at: new Date(now - 60_000).toISOString(),
      } as any),
    ).toBe('expired');
    expect(
      cmp.bannerStatus({
        is_active: true,
        starts_at: new Date(now - 60_000).toISOString(),
        ends_at: new Date(now + 60_000).toISOString(),
      } as any),
    ).toBe('active');
  });
});
