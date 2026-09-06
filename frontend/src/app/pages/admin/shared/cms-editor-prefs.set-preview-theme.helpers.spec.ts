import { CmsEditorPrefsService } from './cms-editor-prefs.service';

/** Golden WU cms-editor-prefs-set-preview-theme -- setPreviewTheme. */
describe('CmsEditorPrefsService setPreviewTheme (golden WU)', () => {
  it('sets previewTheme and persists', () => {
    const svc = Object.create(CmsEditorPrefsService.prototype) as CmsEditorPrefsService;
    Object.assign(svc as any, {
      previewTheme: { set: jasmine.createSpy('set') },
      persist: jasmine.createSpy('persist'),
    });
    svc.setPreviewTheme('dark');
    expect((svc as any).previewTheme.set).toHaveBeenCalledWith('dark');
    expect((svc as any).persist).toHaveBeenCalled();
  });
});
