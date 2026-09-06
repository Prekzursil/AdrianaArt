import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-draft-dirty — blogDraftDirty. */
describe('AdminComponent blogDraftDirty (golden WU)', () => {
  it('reads dirty from cmsBlogDrafts manager', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).selectedBlogKey = 'post-1';
    (cmp as any).blogEditLang = 'ro';
    (cmp as any).blogDraftId = (k: string, lang: string) => `${k}:${lang}`;
    (cmp as any).cmsBlogDrafts = { get: () => ({ dirty: true }) };
    expect(cmp.blogDraftDirty()).toBe(true);
    (cmp as any).cmsBlogDrafts = { get: () => ({ dirty: false }) };
    expect(cmp.blogDraftDirty()).toBe(false);
    (cmp as any).selectedBlogKey = '';
    expect(cmp.blogDraftDirty()).toBe(false);
  });
});
