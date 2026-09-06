import { BlogListComponent } from './blog-list.component';

/** Golden WU blog-list-normalize-sort -- normalizeSort. */
describe('BlogListComponent normalizeSort (golden WU)', () => {
  it('accepts known sorts and rejects junk', () => {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    expect((cmp as any).normalizeSort(' newest ')).toBe('newest');
    expect((cmp as any).normalizeSort('most_commented')).toBe('most_commented');
    expect((cmp as any).normalizeSort('nope')).toBeNull();
    expect((cmp as any).normalizeSort(12)).toBeNull();
  });
});
