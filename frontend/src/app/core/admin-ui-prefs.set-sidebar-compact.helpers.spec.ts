import { AdminUiPrefsService } from './admin-ui-prefs.service';

/** Golden WU admin-ui-prefs-set-sidebar-compact — setSidebarCompact. */
describe('AdminUiPrefsService setSidebarCompact (golden WU)', () => {
  it('sets sidebarCompact and persists', () => {
    const svc = Object.create(AdminUiPrefsService.prototype) as AdminUiPrefsService;
    let compact: boolean | null = null;
    let persisted = 0;
    Object.assign(svc as any, {
      sidebarCompact: { set: (v: boolean) => (compact = v) },
      persist: () => (persisted += 1),
    });
    svc.setSidebarCompact(true);
    expect(compact).toBe(true);
    expect(persisted).toBe(1);
  });
});
