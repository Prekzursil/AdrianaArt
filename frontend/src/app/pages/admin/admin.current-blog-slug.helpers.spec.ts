import { AdminComponent } from './admin.component';

/** Golden WU admin-current-blog-slug — currentBlogSlug. */
describe('AdminComponent currentBlogSlug (golden WU)', () => {
  it('extracts slug from selectedBlogKey or returns empty', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    Object.assign(cmp as any, {
      selectedBlogKey: 'blog.hello-world',
      extractBlogSlug: (key: string) => key.slice('blog.'.length),
    });
    expect(cmp.currentBlogSlug()).toBe('hello-world');
    (cmp as any).selectedBlogKey = null;
    expect(cmp.currentBlogSlug()).toBe('');
  });
});
