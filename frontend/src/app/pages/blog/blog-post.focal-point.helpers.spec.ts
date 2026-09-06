import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-focal-point — focalPoint. */
describe('BlogPostComponent focalPoint (golden WU)', () => {
  it('clamps and formats object-position percentages', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    expect(cmp.focalPoint()).toBe('50% 50%');
    expect(cmp.focalPoint(-10, 120)).toBe('0% 100%');
    expect(cmp.focalPoint(33.6, 66.4)).toBe('34% 66%');
  });
});
