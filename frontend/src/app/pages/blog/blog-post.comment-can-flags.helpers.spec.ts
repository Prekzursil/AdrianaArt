import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-comment-can-flags — canSubscribeToComments/canDelete/canReply (#766 sidecar). */
describe('BlogPostComponent comment capability helpers (golden WU)', () => {
  function createCmp(auth: Record<string, unknown> = {}) {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).auth = {
      isAuthenticated: () => false,
      user: () => null,
      isAdmin: () => false,
      ...auth,
    };
    return cmp;
  }

  const live = { id: 'c1', is_deleted: false, author: { id: 'u1' } } as any;
  const dead = { id: 'c2', is_deleted: true, author: { id: 'u1' } } as any;

  it('canSubscribeToComments requires auth + verified email', () => {
    expect(createCmp().canSubscribeToComments()).toBe(false);
    expect(
      createCmp({
        isAuthenticated: () => true,
        user: () => ({ email_verified: false }),
      }).canSubscribeToComments(),
    ).toBe(false);
    expect(
      createCmp({
        isAuthenticated: () => true,
        user: () => ({ email_verified: true }),
      }).canSubscribeToComments(),
    ).toBe(true);
  });

  it('canDelete allows author or admin and blocks deleted/anon', () => {
    expect(createCmp().canDelete(live)).toBe(false);
    const author = createCmp({
      isAuthenticated: () => true,
      user: () => ({ id: 'u1' }),
    });
    expect(author.canDelete(live)).toBe(true);
    expect(author.canDelete(dead)).toBe(false);
    const admin = createCmp({
      isAuthenticated: () => true,
      user: () => ({ id: 'admin' }),
      isAdmin: () => true,
    });
    expect(admin.canDelete(live)).toBe(true);
  });

  it('canReply requires auth and a live comment', () => {
    expect(createCmp().canReply(live)).toBe(false);
    const authed = createCmp({ isAuthenticated: () => true });
    expect(authed.canReply(live)).toBe(true);
    expect(authed.canReply(dead)).toBe(false);
  });
});
