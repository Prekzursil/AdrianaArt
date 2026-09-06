import { CmsEditorPrefsService } from './cms-editor-prefs.service';

/** Golden WU cms-editor-prefs-set-preview-lang -- setPreviewLang. */
describe('CmsEditorPrefsService setPreviewLang (golden WU)', () => {
  it('sets previewLang and persists', () => {
    const svc = Object.create(CmsEditorPrefsService.prototype) as CmsEditorPrefsService;
    Object.assign(svc as any, {
      previewLang: { set: jasmine.createSpy('set') },
      persist: jasmine.createSpy('persist'),
    });
    svc.setPreviewLang('ro');
    expect((svc as any).previewLang.set).toHaveBeenCalledWith('ro');
    expect((svc as any).persist).toHaveBeenCalled();
  });
});
