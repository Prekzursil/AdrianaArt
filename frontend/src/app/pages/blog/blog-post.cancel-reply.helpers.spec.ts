import { signal } from '@angular/core';
import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent cancelReply (golden WU)', () => {
  it('clears replyTo signal', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    const replyTo = signal<any>({ id: 'c1' });
    (cmp as any).replyTo = replyTo;
    cmp.cancelReply();
    expect(replyTo()).toBeNull();
  });
});
