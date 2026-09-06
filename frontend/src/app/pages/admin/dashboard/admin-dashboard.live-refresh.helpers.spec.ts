import { signal } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-live-refresh-helpers. */
describe('AdminDashboardComponent live refresh helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      auth: { role: () => 'admin' },
      liveRefreshEnabled: signal(false),
      persistLiveRefreshPreference: jasmine.createSpy('persist'),
      startLiveRefresh: jasmine.createSpy('start'),
      stopLiveRefresh: jasmine.createSpy('stop'),
      ...overrides,
    });
    return cmp;
  }

  it('isOwner checks role', () => {
    expect(bare().isOwner()).toBe(false);
    expect(bare({ auth: { role: () => 'owner' } }).isOwner()).toBe(true);
  });

  it('toggleLiveRefresh enables then disables', () => {
    const cmp = bare();
    cmp.toggleLiveRefresh();
    expect((cmp as any).liveRefreshEnabled()).toBe(true);
    expect((cmp as any).startLiveRefresh).toHaveBeenCalled();
    cmp.toggleLiveRefresh();
    expect((cmp as any).liveRefreshEnabled()).toBe(false);
    expect((cmp as any).stopLiveRefresh).toHaveBeenCalled();
  });
});
