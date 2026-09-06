import { AdminUiPrefsService } from './admin-ui-prefs.service';

/** Golden WU admin-ui-prefs-toggle-mode — toggleMode. */
describe('AdminUiPrefsService toggleMode (golden WU)', () => {
  it('flips simple <-> advanced via setMode', () => {
    const svc = Object.create(AdminUiPrefsService.prototype) as AdminUiPrefsService;
    const modes: any[] = [];
    Object.assign(svc as any, {
      mode: () => 'simple',
      setMode: (m: any) => modes.push(m),
    });
    svc.toggleMode();
    expect(modes).toEqual(['advanced']);
    Object.assign(svc as any, { mode: () => 'advanced' });
    svc.toggleMode();
    expect(modes).toEqual(['advanced', 'simple']);
  });
});
