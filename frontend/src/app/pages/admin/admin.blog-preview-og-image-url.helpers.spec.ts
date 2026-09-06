import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-preview-og-image-url — blogPreviewOgImageUrl. */
describe('AdminComponent blogPreviewOgImageUrl (golden WU)', () => {
  it('returns null without preview token; otherwise builds preview og URL', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).blogPreviewToken = '';
    (cmp as any).currentBlogSlug = () => 'draft-post';
    expect(cmp.blogPreviewOgImageUrl('en' as any)).toBeNull();
    (cmp as any).blogPreviewToken = 'tok123';
    const url = cmp.blogPreviewOgImageUrl('en' as any)!;
    expect(url).toContain('/blog/posts/draft-post/og.png');
    expect(url).toContain('preview=tok123');
    expect(url).toContain('lang=en');
  });
});
