import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-public-url — blogPublicUrl. */
describe('AdminComponent blogPublicUrl (golden WU)', () => {
  it('builds a relative blog URL when window is unavailable', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).currentBlogSlug = () => 'my-post';
    const url = cmp.blogPublicUrl('en' as any);
    expect(url).toContain('/blog/my-post');
    expect(url).toContain('lang=en');
  });
});
