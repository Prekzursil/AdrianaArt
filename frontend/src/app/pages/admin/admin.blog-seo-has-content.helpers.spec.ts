import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-seo-has-content — blogSeoHasContent. */
describe('AdminComponent blogSeoHasContent (golden WU)', () => {
  it('requires a selected blog and title/body for the active or snapshot lang', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).selectedBlogKey = '';
    expect(cmp.blogSeoHasContent('ro' as any)).toBe(false);

    (cmp as any).selectedBlogKey = 'post-1';
    (cmp as any).blogEditLang = 'ro';
    (cmp as any).blogForm = { title: '  ', body_markdown: '' };
    (cmp as any).blogSeoSnapshots = { en: { title: 'Hello', body_markdown: '' } };
    expect(cmp.blogSeoHasContent('ro' as any)).toBe(false);

    (cmp as any).blogForm = { title: 'Titlu', body_markdown: '' };
    expect(cmp.blogSeoHasContent('ro' as any)).toBe(true);

    expect(cmp.blogSeoHasContent('en' as any)).toBe(true);
    (cmp as any).blogSeoSnapshots = { en: { title: '', body_markdown: '' } };
    expect(cmp.blogSeoHasContent('en' as any)).toBe(false);
  });
});
