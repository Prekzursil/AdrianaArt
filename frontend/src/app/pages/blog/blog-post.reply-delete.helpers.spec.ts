import { signal } from '@angular/core';
import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-reply-delete — N=3 canDelete / canReply / startReply+cancelReply (#770 sidecar). */
describe('BlogPostComponent reply/delete helpers (golden WU)', () => {
  function createCmp(authOverrides: Record<string, unknown> = {}): BlogPostComponent {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).auth = {
      isAuthenticated: () => false,
      user: () => null,
      isAdmin: () => false,
      ...authOverrides,
    };
    (cmp as any).replyTo = signal(null);
    return cmp;
  }

  const mine = { id: 'c1', is_deleted: false, author: { id: 'u-me' } } as any;
  const theirs = { id: 'c2', is_deleted: false, author: { id: 'u-other' } } as any;
  const dead = { id: 'c3', is_deleted: true, author: { id: 'u-me' } } as any;

  it('canDelete allows author or admin and blocks deleted/anonymous', () => {
    expect(createCmp().canDelete(mine)).toBe(false);

    expect(
      createCmp({
        isAuthenticated: () => true,
        user: () => null,
        isAdmin: () => false,
      }).canDelete(mine),
    ).toBe(false);

    const asAuthor = createCmp({
      isAuthenticated: () => true,
      user: () => ({ id: 'u-me' }),
      isAdmin: () => false,
    });
    expect(asAuthor.canDelete(mine)).toBe(true);
    expect(asAuthor.canDelete(theirs)).toBe(false);
    expect(asAuthor.canDelete(dead)).toBe(false);

    const asAdmin = createCmp({
      isAuthenticated: () => true,
      user: () => ({ id: 'u-admin' }),
      isAdmin: () => true,
    });
    expect(asAdmin.canDelete(theirs)).toBe(true);
  });

  it('canReply requires auth and a live comment', () => {
    expect(createCmp().canReply(mine)).toBe(false);
    const authed = createCmp({ isAuthenticated: () => true });
    expect(authed.canReply(mine)).toBe(true);
    expect(authed.canReply(dead)).toBe(false);
  });

  it('startReply / cancelReply toggle replyTo', () => {
    const cmp = createCmp();
    expect((cmp as any).replyTo()).toBeNull();
    cmp.startReply(mine);
    expect((cmp as any).replyTo()).toBe(mine);
    cmp.cancelReply();
    expect((cmp as any).replyTo()).toBeNull();
  });
});
