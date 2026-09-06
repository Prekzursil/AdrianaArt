import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-draft-ready — blogDraftReady. */
describe('AdminComponent blogDraftReady (golden WU)', () => {
  it('requires selectedBlogKey and manager.isReady()', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).selectedBlogKey = '';
    (cmp as any).blogEditLang = 'en';
    (cmp as any).blogDraftId = (k: string, lang: string) => `${k}:${lang}`;
    (cmp as any).cmsBlogDrafts = { get: () => ({ isReady: () => true }) };
    expect(cmp.blogDraftReady()).toBe(false);
    (cmp as any).selectedBlogKey = 'post-1';
    expect(cmp.blogDraftReady()).toBe(true);
    (cmp as any).cmsBlogDrafts = { get: () => undefined };
    expect(cmp.blogDraftReady()).toBe(false);
  });
});
