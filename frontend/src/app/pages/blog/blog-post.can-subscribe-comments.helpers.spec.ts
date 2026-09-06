import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-can-subscribe-comments — canSubscribeToComments. */
describe('BlogPostComponent canSubscribeToComments (golden WU)', () => {
  it('requires authenticated user with verified email', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).auth = { isAuthenticated: () => false, user: () => null };
    expect(cmp.canSubscribeToComments()).toBe(false);
    (cmp as any).auth = {
      isAuthenticated: () => true,
      user: () => ({ email_verified: false }),
    };
    expect(cmp.canSubscribeToComments()).toBe(false);
    (cmp as any).auth = {
      isAuthenticated: () => true,
      user: () => ({ email_verified: true }),
    };
    expect(cmp.canSubscribeToComments()).toBe(true);
  });
});
