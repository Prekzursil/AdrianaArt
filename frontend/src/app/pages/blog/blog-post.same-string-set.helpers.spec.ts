import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent sameStringSet (golden WU)', () => {
  const same = (a: string[], b: string[]) =>
    (Object.create(BlogPostComponent.prototype) as any).sameStringSet(a, b);

  it('compares trimmed lowercased sets ignoring order/dupes', () => {
    expect(same(['A', 'b'], ['b', 'a'])).toBe(true);
    expect(same(['A', 'A'], ['a'])).toBe(true);
    expect(same(['a'], ['a', 'b'])).toBe(false);
    expect(same(['a'], ['c'])).toBe(false);
    expect(same(['', ' x '], ['x'])).toBe(true);
  });
});
