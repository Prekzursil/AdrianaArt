import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-post-start-reply -- startReply. */
describe('BlogPostComponent startReply (golden WU)', () => {
  it('stores the comment on replyTo', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    const comment = { id: 'c1' } as any;
    Object.assign(cmp as any, {
      replyTo: { set: jasmine.createSpy('set') },
    });
    cmp.startReply(comment);
    expect((cmp as any).replyTo.set).toHaveBeenCalledWith(comment);
  });
});
