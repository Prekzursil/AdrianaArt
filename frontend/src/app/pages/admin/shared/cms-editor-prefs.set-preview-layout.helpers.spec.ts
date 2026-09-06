import { signal } from '@angular/core';
import { CmsEditorPrefsService } from './cms-editor-prefs.service';

/** Golden WU cms-editor-prefs-set-preview-layout — setPreviewLayout. */
describe('CmsEditorPrefsService setPreviewLayout (golden WU)', () => {
  it('updates previewLayout and persists', () => {
    const svc = Object.create(CmsEditorPrefsService.prototype) as CmsEditorPrefsService;
    let persists = 0;
    Object.assign(svc as any, {
      previewLayout: signal('stacked' as const),
      persist: () => {
        persists += 1;
      },
    });
    svc.setPreviewLayout('split');
    expect(svc.previewLayout()).toBe('split');
    expect(persists).toBe(1);
  });
});
