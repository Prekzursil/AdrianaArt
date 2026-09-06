import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-post-can-edit-blog — canEditBlog. */
describe('BlogPostComponent canEditBlog (golden WU)', () => {
  it('follows storefrontAdminMode.enabled', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    Object.assign(cmp as any, {
      storefrontAdminMode: { enabled: () => true },
    });
    expect(cmp.canEditBlog()).toBe(true);
    (cmp as any).storefrontAdminMode = { enabled: () => false };
    expect(cmp.canEditBlog()).toBe(false);
  });
});
