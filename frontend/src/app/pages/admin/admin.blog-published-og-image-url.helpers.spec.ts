import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-published-og-image-url — blogPublishedOgImageUrl. */
describe('AdminComponent blogPublishedOgImageUrl (golden WU)', () => {
  it('builds an og.png path for the current blog slug', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).currentBlogSlug = () => 'summer-sale';
    const url = cmp.blogPublishedOgImageUrl('ro' as any);
    expect(url).toContain('/blog/posts/summer-sale/og.png');
    expect(url).toContain('lang=ro');
  });
});
