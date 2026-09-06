import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-post-cancel-reply -- cancelReply. */
describe('BlogPostComponent cancelReply (golden WU)', () => {
  it('clears replyTo signal', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    Object.assign(cmp as any, {
      replyTo: { set: jasmine.createSpy('set') },
    });
    cmp.cancelReply();
    expect((cmp as any).replyTo.set).toHaveBeenCalledWith(null);
  });
});
