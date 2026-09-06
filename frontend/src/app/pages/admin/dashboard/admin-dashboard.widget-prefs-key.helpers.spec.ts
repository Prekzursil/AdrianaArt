import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-widget-prefs-key — widgetPrefsKey. */
describe('AdminDashboardComponent widgetPrefsKey (golden WU)', () => {
  function bare(user: any): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, { auth: { user: () => user } });
    return cmp;
  }

  it('scopes prefs key by user id or anon', () => {
    expect((bare(null) as any).widgetPrefsKey()).toBe('admin_dashboard_widgets_v1:anon');
    expect((bare({ id: 'u1' }) as any).widgetPrefsKey()).toBe('admin_dashboard_widgets_v1:u1');
  });
});
