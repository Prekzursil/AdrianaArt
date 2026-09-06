import { signal } from '@angular/core';
import { CmsEditorPrefsService } from './cms-editor-prefs.service';

/** Golden WU cms-editor-prefs-toggle-mode — toggleMode. */
describe('CmsEditorPrefsService toggleMode (golden WU)', () => {
  it('flips simple and advanced via setMode', () => {
    const svc = Object.create(CmsEditorPrefsService.prototype) as CmsEditorPrefsService;
    const modes: string[] = [];
    Object.assign(svc as any, {
      mode: signal('simple' as const),
      setMode: (mode: 'simple' | 'advanced') => {
        modes.push(mode);
        (svc as any).mode.set(mode);
      },
    });
    svc.toggleMode();
    expect(modes).toEqual(['advanced']);
    expect(svc.mode()).toBe('advanced');
    svc.toggleMode();
    expect(modes).toEqual(['advanced', 'simple']);
  });
});
