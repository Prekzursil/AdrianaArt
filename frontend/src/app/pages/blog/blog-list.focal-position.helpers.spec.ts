import { BlogListComponent } from './blog-list.component';

/** Golden WU blog-list-focal-position -- focalPosition. */
describe('BlogListComponent focalPosition (golden WU)', () => {
  it('clamps and defaults focal percents', () => {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    expect(cmp.focalPosition(null, null)).toBe('50% 50%');
    expect(cmp.focalPosition(-10, 150)).toBe('0% 100%');
    expect(cmp.focalPosition(33.6, 12.2)).toBe('34% 12%');
  });
});
