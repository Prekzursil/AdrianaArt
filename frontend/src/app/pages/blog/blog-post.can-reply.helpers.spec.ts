import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-can-reply — canReply. */
describe('BlogPostComponent canReply (golden WU)', () => {
  it('requires auth and a non-deleted comment', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).auth = { isAuthenticated: () => false };
    expect(cmp.canReply({ is_deleted: false } as any)).toBe(false);
    (cmp as any).auth = { isAuthenticated: () => true };
    expect(cmp.canReply({ is_deleted: true } as any)).toBe(false);
    expect(cmp.canReply({ is_deleted: false } as any)).toBe(true);
  });
});
