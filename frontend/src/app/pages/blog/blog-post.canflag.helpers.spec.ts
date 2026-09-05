import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-canflag — canFlag gate arms. */
describe('BlogPostComponent canFlag helpers (golden WU)', () => {
  function createCmp(authOverrides: Record<string, unknown> = {}) {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).auth = {
      isAuthenticated: () => false,
      user: () => null,
      ...authOverrides,
    };
    return cmp;
  }

  const live = { id: 'c1', is_deleted: false, is_hidden: false, author: { id: 'u-other' } } as any;
  const mine = { id: 'c2', is_deleted: false, is_hidden: false, author: { id: 'u-me' } } as any;
  const deleted = { id: 'c3', is_deleted: true, is_hidden: false, author: { id: 'u-other' } } as any;
  const hidden = { id: 'c4', is_deleted: false, is_hidden: true, author: { id: 'u-other' } } as any;

  it('canFlag requires auth + user', () => {
    expect(createCmp().canFlag(live)).toBe(false);
    expect(
      createCmp({ isAuthenticated: () => true, user: () => null }).canFlag(live),
    ).toBe(false);
  });

  it('canFlag blocks deleted/hidden/own comments', () => {
    const cmp = createCmp({
      isAuthenticated: () => true,
      user: () => ({ id: 'u-me' }),
    });
    expect(cmp.canFlag(deleted)).toBe(false);
    expect(cmp.canFlag(hidden)).toBe(false);
    expect(cmp.canFlag(mine)).toBe(false);
  });

  it('canFlag allows flagging another user live comment', () => {
    const cmp = createCmp({
      isAuthenticated: () => true,
      user: () => ({ id: 'u-me' }),
    });
    expect(cmp.canFlag(live)).toBe(true);
  });
});
