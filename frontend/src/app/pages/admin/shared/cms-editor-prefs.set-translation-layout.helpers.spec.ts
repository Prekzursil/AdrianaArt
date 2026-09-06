import { CmsEditorPrefsService } from './cms-editor-prefs.service';

/** Golden WU cms-editor-prefs-set-translation-layout -- setTranslationLayout. */
describe('CmsEditorPrefsService setTranslationLayout (golden WU)', () => {
  it('sets translationLayout and persists', () => {
    const svc = Object.create(CmsEditorPrefsService.prototype) as CmsEditorPrefsService;
    Object.assign(svc as any, {
      translationLayout: { set: jasmine.createSpy('set') },
      persist: jasmine.createSpy('persist'),
    });
    svc.setTranslationLayout('sideBySide');
    expect((svc as any).translationLayout.set).toHaveBeenCalledWith('sideBySide');
    expect((svc as any).persist).toHaveBeenCalled();
  });
});
