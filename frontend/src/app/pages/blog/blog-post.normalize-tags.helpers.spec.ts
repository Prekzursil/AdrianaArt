import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent normalizeTags (golden WU)', () => {
  const normalize = (raw: unknown) =>
    (Object.create(BlogPostComponent.prototype) as any).normalizeTags(raw);

  it('splits/trims/dedupes tags case-insensitively', () => {
    expect(normalize(null)).toEqual([]);
    expect(normalize('Clay, glaze, Clay')).toEqual(['Clay', 'glaze']);
    expect(normalize(['  A ', 'a', '', 'B'])).toEqual(['A', 'B']);
    expect(normalize(42)).toEqual([]);
  });
});
