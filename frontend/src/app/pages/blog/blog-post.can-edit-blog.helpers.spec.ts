import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-can-edit-blog — canEditBlog. */
describe('BlogPostComponent canEditBlog (golden WU)', () => {
  it('delegates to storefrontAdminMode.enabled', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).storefrontAdminMode = { enabled: () => true };
    expect(cmp.canEditBlog()).toBe(true);
    (cmp as any).storefrontAdminMode = { enabled: () => false };
    expect(cmp.canEditBlog()).toBe(false);
  });
});
