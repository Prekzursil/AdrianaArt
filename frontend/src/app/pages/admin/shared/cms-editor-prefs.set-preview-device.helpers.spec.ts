import { signal } from '@angular/core';
import { CmsEditorPrefsService } from './cms-editor-prefs.service';

/** Golden WU cms-editor-prefs-set-preview-device — setPreviewDevice. */
describe('CmsEditorPrefsService setPreviewDevice (golden WU)', () => {
  it('updates previewDevice and persists', () => {
    const svc = Object.create(CmsEditorPrefsService.prototype) as CmsEditorPrefsService;
    let persists = 0;
    Object.assign(svc as any, {
      previewDevice: signal('desktop' as const),
      persist: () => {
        persists += 1;
      },
    });
    svc.setPreviewDevice('mobile');
    expect(svc.previewDevice()).toBe('mobile');
    expect(persists).toBe(1);
  });
});
