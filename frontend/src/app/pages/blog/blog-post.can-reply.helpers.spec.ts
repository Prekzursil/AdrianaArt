import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-post-can-reply — canReply. */
describe('BlogPostComponent canReply (golden WU)', () => {
  function bare(authed: boolean): BlogPostComponent {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    Object.assign(cmp as any, {
      auth: { isAuthenticated: () => authed },
    });
    return cmp;
  }

  it('requires auth and non-deleted comment', () => {
    expect(bare(false).canReply({ is_deleted: false } as any)).toBe(false);
    expect(bare(true).canReply({ is_deleted: true } as any)).toBe(false);
    expect(bare(true).canReply({ is_deleted: false } as any)).toBe(true);
  });
});
