import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-draft-last-autosaved-at — blogDraftLastAutosavedAt. */
describe('AdminComponent blogDraftLastAutosavedAt (golden WU)', () => {
  it('returns null without selection; otherwise lastAutosavedAt from map', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).selectedBlogKey = '';
    expect(cmp.blogDraftLastAutosavedAt()).toBeNull();
    (cmp as any).selectedBlogKey = 'post-1';
    (cmp as any).blogEditLang = 'en';
    (cmp as any).blogDraftId = () => 'post-1:en';
    (cmp as any).cmsBlogDrafts = new Map([
      ['post-1:en', { lastAutosavedAt: '2026-09-06T07:00:00Z' }],
    ]);
    expect(cmp.blogDraftLastAutosavedAt()).toBe('2026-09-06T07:00:00Z');
  });
});
