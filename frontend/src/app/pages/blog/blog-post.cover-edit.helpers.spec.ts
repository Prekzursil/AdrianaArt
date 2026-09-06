import { BlogPostComponent } from './blog-post.component';

/** Golden WU — coverImageClass / canEditBlog. */
describe('BlogPostComponent coverImageClass / canEditBlog (golden WU)', () => {
  function bare(enabled = false): BlogPostComponent {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).storefrontAdminMode = { enabled: () => enabled };
    return cmp;
  }

  it('coverImageClass switches contain vs cover', () => {
    const cmp = bare();
    expect(cmp.coverImageClass('contain')).toContain('object-contain');
    expect(cmp.coverImageClass('cover')).toContain('object-cover');
    expect(cmp.coverImageClass(null)).toContain('object-cover');
  });

  it('canEditBlog mirrors storefrontAdminMode.enabled', () => {
    expect(bare(false).canEditBlog()).toBe(false);
    expect(bare(true).canEditBlog()).toBe(true);
  });
});
