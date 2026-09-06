import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-draft-restore-at — blogDraftRestoreAt. */
describe('AdminComponent blogDraftRestoreAt (golden WU)', () => {
  it('returns restorableAutosaveAt from ensureBlogDraft when selected', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).selectedBlogKey = '';
    expect(cmp.blogDraftRestoreAt()).toBeNull();
    (cmp as any).selectedBlogKey = 'post-1';
    (cmp as any).blogEditLang = 'ro';
    (cmp as any).ensureBlogDraft = () => ({ restorableAutosaveAt: '2026-09-01T12:00:00Z' });
    expect(cmp.blogDraftRestoreAt()).toBe('2026-09-01T12:00:00Z');
  });
});
