import { BlogListComponent } from './blog-list.component';

describe('BlogListComponent normalizeSort (golden WU)', () => {
  const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;

  it('accepts known sorts; rejects junk/non-strings', () => {
    const norm = (v: unknown) => (cmp as any).normalizeSort(v);
    expect(norm('newest')).toBe('newest');
    expect(norm('oldest')).toBe('oldest');
    expect(norm('most_viewed')).toBe('most_viewed');
    expect(norm('most_commented')).toBe('most_commented');
    expect(norm('  oldest  ')).toBe('oldest');
    expect(norm('nope')).toBeNull();
    expect(norm(1)).toBeNull();
    expect(norm(null)).toBeNull();
  });
});
