import { CmsEditorPrefsService } from './cms-editor-prefs.service';

/** Golden WU cms-editor-prefs-storage-key — storageKey. */
describe('CmsEditorPrefsService storageKey (golden WU)', () => {
  it('scopes the key by user id or anonymous', () => {
    const svc = Object.create(CmsEditorPrefsService.prototype) as CmsEditorPrefsService;
    (svc as any).auth = { user: () => ({ id: ' u1 ' }) };
    expect((svc as any).storageKey()).toBe('admin.content.editorMode.v1:u1');
    (svc as any).auth = { user: () => null };
    expect((svc as any).storageKey()).toBe('admin.content.editorMode.v1:anonymous');
  });
});
