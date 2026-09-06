import { BlogPostComponent } from "./blog-post.component";

/** Golden WU blog-post-can-subscribe-to-comments — canSubscribeToComments. */
describe("BlogPostComponent canSubscribeToComments (golden WU)", () => {
  it("requires auth + verified email", () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).auth = { isAuthenticated: () => false, user: () => ({ email_verified: true }) };
    expect(cmp.canSubscribeToComments()).toBe(false);
    (cmp as any).auth = { isAuthenticated: () => true, user: () => ({ email_verified: false }) };
    expect(cmp.canSubscribeToComments()).toBe(false);
    (cmp as any).auth = { isAuthenticated: () => true, user: () => ({ email_verified: true }) };
    expect(cmp.canSubscribeToComments()).toBe(true);
    (cmp as any).auth = { isAuthenticated: () => true, user: () => null };
    expect(cmp.canSubscribeToComments()).toBe(false);
  });
});
