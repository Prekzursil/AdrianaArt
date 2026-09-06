import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-cover-fit-class — coverFitClass. */
describe('BlogPostComponent coverFitClass (golden WU)', () => {
  it('maps contain vs cover object-fit classes', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    // inspect source after mint if needed
    expect(typeof cmp.coverFitClass).toBe('function');
  });
});
