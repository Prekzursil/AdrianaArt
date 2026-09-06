import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU admin-layout-track-alerts-helpers. */
describe('AdminLayoutComponent track/alerts helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminLayoutComponent {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    Object.assign(cmp as any, {
      auth: {
        user: () => ({ admin_training_mode: false }),
        canAccessAdminSection: () => false,
      },
      uiPrefs: { preset: () => 'full' },
      alertsLoading: false,
      alertsError: null,
      lowStockCount: 0,
      failedWebhooksCount: 0,
      failedEmailsCount: 0,
      onNavQueryChange: jasmine.createSpy('onNavQueryChange'),
      ...overrides,
    });
    return cmp;
  }

  it('trackBy helpers return path/key', () => {
    const cmp = bare();
    expect(cmp.trackByNavPath(0, { path: '/admin/orders' } as any)).toBe('/admin/orders');
    expect(cmp.trackByGroupKey(0, { key: 'commerce' } as any)).toBe('commerce');
  });

  it('isTrainingMode mirrors auth user flag', () => {
    expect(bare().isTrainingMode()).toBe(false);
    expect(
      bare({ auth: { user: () => ({ admin_training_mode: true }), canAccessAdminSection: () => false } }).isTrainingMode(),
    ).toBe(true);
  });

  it('shouldShowAlerts respects preset, loading/error, and section counts', () => {
    expect(bare({ uiPrefs: { preset: () => 'owner_basic' } }).shouldShowAlerts()).toBe(false);
    expect(bare({ alertsLoading: true }).shouldShowAlerts()).toBe(true);
    expect(bare({ alertsError: 'x' }).shouldShowAlerts()).toBe(true);
    expect(
      bare({
        lowStockCount: 2,
        auth: { user: () => ({}), canAccessAdminSection: (s: string) => s === 'inventory' },
      }).shouldShowAlerts(),
    ).toBe(true);
  });

  it('clearNavQuery delegates to onNavQueryChange("")', () => {
    const cmp = bare();
    cmp.clearNavQuery();
    expect((cmp as any).onNavQueryChange).toHaveBeenCalledWith('');
  });
});
