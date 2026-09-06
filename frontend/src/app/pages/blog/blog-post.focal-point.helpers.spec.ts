import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-focal-point — focalPosition. */
describe('BlogPostComponent focalPosition (golden WU)', () => {
  it('clamps and formats object-position percentages', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    expect(cmp.focalPosition()).toBe('50% 50%');
    expect(cmp.focalPosition(-10, 120)).toBe('0% 100%');
    expect(cmp.focalPosition(33.6, 66.4)).toBe('34% 66%');
  });
});
