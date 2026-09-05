import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent canFlag/canSubscribe/canReply (golden WU #766 sidecar)', () => {
  function make(overrides: Record<string, unknown> = {}): any {
    const proto = Object.create(BlogPostComponent.prototype);
    Object.assign(
      proto,
      {
        auth: {
          isAuthenticated: () => true,
          user: () => ({ id: 'me', email_verified: true }),
        },
      },
      overrides,
    );
    return proto;
  }

  describe('canFlag', () => {
    it('allows flagging others; blocks self/deleted/hidden/anon', () => {
      const other = { author: { id: 'them' }, is_deleted: false, is_hidden: false } as any;
      expect(make().canFlag(other)).toBe(true);
      expect(make().canFlag({ ...other, author: { id: 'me' } })).toBe(false);
      expect(make().canFlag({ ...other, is_deleted: true })).toBe(false);
      expect(make().canFlag({ ...other, is_hidden: true })).toBe(false);
      expect(
        make({
          auth: { isAuthenticated: () => false, user: () => null },
        }).canFlag(other),
      ).toBe(false);
    });
  });

  describe('canSubscribeToComments', () => {
    it('requires auth + verified email', () => {
      expect(make().canSubscribeToComments()).toBe(true);
      expect(
        make({
          auth: { isAuthenticated: () => true, user: () => ({ id: 'me', email_verified: false }) },
        }).canSubscribeToComments(),
      ).toBe(false);
      expect(
        make({ auth: { isAuthenticated: () => false, user: () => null } }).canSubscribeToComments(),
      ).toBe(false);
    });
  });

  describe('canReply', () => {
    it('allows authenticated replies to live comments only', () => {
      expect(make().canReply({ is_deleted: false } as any)).toBe(true);
      expect(make().canReply({ is_deleted: true } as any)).toBe(false);
      expect(
        make({ auth: { isAuthenticated: () => false, user: () => null } }).canReply({
          is_deleted: false,
        } as any),
      ).toBe(false);
    });
  });
});
