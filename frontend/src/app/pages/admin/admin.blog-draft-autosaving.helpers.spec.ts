import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-draft-autosaving — blogDraftAutosaving. */
describe('AdminComponent blogDraftAutosaving (golden WU)', () => {
  it('reads autosavePending from manager when key selected', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).selectedBlogKey = 'post-1';
    (cmp as any).blogEditLang = 'en';
    (cmp as any).blogDraftId = () => 'id';
    (cmp as any).cmsBlogDrafts = { get: () => ({ autosavePending: true }) };
    expect(cmp.blogDraftAutosaving()).toBe(true);
    (cmp as any).cmsBlogDrafts = { get: () => ({ autosavePending: false }) };
    expect(cmp.blogDraftAutosaving()).toBe(false);
    (cmp as any).selectedBlogKey = null;
    expect(cmp.blogDraftAutosaving()).toBe(false);
  });
});
