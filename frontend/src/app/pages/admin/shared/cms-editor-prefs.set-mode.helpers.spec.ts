import { signal } from '@angular/core';
import { CmsEditorPrefsService } from './cms-editor-prefs.service';

/** Golden WU cms-editor-prefs-set-mode — setMode. */
describe('CmsEditorPrefsService setMode (golden WU)', () => {
  it('updates mode and persists', () => {
    const svc = Object.create(CmsEditorPrefsService.prototype) as CmsEditorPrefsService;
    let persists = 0;
    Object.assign(svc as any, {
      mode: signal('simple' as const),
      persist: () => {
        persists += 1;
      },
    });
    svc.setMode('advanced');
    expect(svc.mode()).toBe('advanced');
    expect(persists).toBe(1);
  });
});
