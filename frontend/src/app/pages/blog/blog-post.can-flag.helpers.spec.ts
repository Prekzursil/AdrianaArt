import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-post-can-flag — canFlag. */
describe('BlogPostComponent canFlag (golden WU)', () => {
  function bare(authed: boolean, meId: string | null): BlogPostComponent {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    Object.assign(cmp as any, {
      auth: {
        isAuthenticated: () => authed,
        user: () => (meId ? { id: meId } : null),
      },
    });
    return cmp;
  }

  it('blocks self deleted hidden and unauthenticated', () => {
    expect(bare(false, 'u1').canFlag({ is_deleted: false, is_hidden: false, author: { id: 'u2' } } as any)).toBe(false);
    expect(bare(true, null).canFlag({ is_deleted: false, is_hidden: false, author: { id: 'u2' } } as any)).toBe(false);
    expect(bare(true, 'u1').canFlag({ is_deleted: true, is_hidden: false, author: { id: 'u2' } } as any)).toBe(false);
    expect(bare(true, 'u1').canFlag({ is_deleted: false, is_hidden: true, author: { id: 'u2' } } as any)).toBe(false);
    expect(bare(true, 'u1').canFlag({ is_deleted: false, is_hidden: false, author: { id: 'u1' } } as any)).toBe(false);
    expect(bare(true, 'u1').canFlag({ is_deleted: false, is_hidden: false, author: { id: 'u2' } } as any)).toBe(true);
  });
});
