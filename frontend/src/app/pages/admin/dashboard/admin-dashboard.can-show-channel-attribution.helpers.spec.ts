import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-can-show-channel-attribution — canShowChannelAttribution. */
describe('AdminDashboardComponent canShowChannelAttribution (golden WU)', () => {
  function bare(ok: boolean): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      auth: { canAccessAdminSection: (s: string) => (s === 'dashboard' ? ok : false) },
    });
    return cmp;
  }

  it('gates on dashboard admin section access', () => {
    expect(bare(true).canShowChannelAttribution()).toBe(true);
    expect(bare(false).canShowChannelAttribution()).toBe(false);
  });
});
