import { AdminComponent } from './admin.component';

/** Golden WU admin-are-all-blog-selected — areAllBlogSelected. */
describe('AdminComponent areAllBlogSelected (golden WU)', () => {
  it('is false for empty posts and true only when every post key is selected', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).blogPosts = () => [];
    (cmp as any).blogBulkSelection = new Set();
    expect(cmp.areAllBlogSelected()).toBe(false);

    (cmp as any).blogPosts = () => [{ key: 'a' }, { key: 'b' }];
    (cmp as any).blogBulkSelection = new Set(['a']);
    expect(cmp.areAllBlogSelected()).toBe(false);

    (cmp as any).blogBulkSelection = new Set(['a', 'b']);
    expect(cmp.areAllBlogSelected()).toBe(true);
  });
});
