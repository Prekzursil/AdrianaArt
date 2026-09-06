import { AdminOpsComponent } from './admin-ops.component';

/** Golden WU admin-ops-dam-age-crumbs — formatDamAge / crumbs / bannerStatus. */
describe('AdminOpsComponent dam-age / crumbs / bannerStatus (golden WU)', () => {
  function createCmp() {
    return Object.create(AdminOpsComponent.prototype) as AdminOpsComponent;
  }

  it('formatDamAge covers null and unit thresholds', () => {
    const cmp = createCmp();
    expect(cmp.formatDamAge(null)).toBe('n/a');
    expect(cmp.formatDamAge(undefined)).toBe('n/a');
    expect(cmp.formatDamAge(0)).toBe('0s');
    expect(cmp.formatDamAge(30)).toBe('30s');
    expect(cmp.formatDamAge(59)).toBe('59s');
    expect(cmp.formatDamAge(60)).toBe('1m');
    expect(cmp.formatDamAge(120)).toBe('2m');
    expect(cmp.formatDamAge(3599)).toBe('59m');
    expect(cmp.formatDamAge(3600)).toBe('1h');
    expect(cmp.formatDamAge(7200)).toBe('2h');
  });

  it('crumbs returns home → admin → ops trail', () => {
    const cmp = createCmp();
    expect(cmp.crumbs()).toEqual([
      { label: 'nav.home', url: '/' },
      { label: 'nav.admin', url: '/admin/dashboard' },
      { label: 'adminUi.nav.ops' },
    ]);
  });

  it('bannerStatus derives disabled / scheduled / expired / active', () => {
    const cmp = createCmp();
    expect(cmp.bannerStatus({ is_active: false } as never)).toBe('disabled');
    expect(
      cmp.bannerStatus({
        is_active: true,
        starts_at: new Date(Date.now() + 86_400_000).toISOString(),
      } as never),
    ).toBe('scheduled');
    expect(
      cmp.bannerStatus({
        is_active: true,
        starts_at: new Date(Date.now() - 86_400_000).toISOString(),
        ends_at: new Date(Date.now() - 3_600_000).toISOString(),
      } as never),
    ).toBe('expired');
    expect(
      cmp.bannerStatus({
        is_active: true,
        starts_at: new Date(Date.now() - 86_400_000).toISOString(),
        ends_at: null,
      } as never),
    ).toBe('active');
  });
});
