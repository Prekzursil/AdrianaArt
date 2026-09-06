import { AdminUiPrefsService } from './admin-ui-prefs.service';

/** Golden WU admin-ui-prefs-storage-key — storageKey. */
describe('AdminUiPrefsService storageKey (golden WU)', () => {
  it('namespaces user id; falls back to anonymous', () => {
    const svc = Object.create(AdminUiPrefsService.prototype) as AdminUiPrefsService;
    Object.assign(svc as any, {
      auth: { user: () => ({ id: '  u-1  ' }) },
    });
    expect((svc as any).storageKey()).toBe('admin.ui.mode.v1:u-1');
    Object.assign(svc as any, { auth: { user: () => null } });
    expect((svc as any).storageKey()).toBe('admin.ui.mode.v1:anonymous');
    Object.assign(svc as any, { auth: { user: () => ({ id: '   ' }) } });
    expect((svc as any).storageKey()).toBe('admin.ui.mode.v1:anonymous');
  });
});
