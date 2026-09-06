import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-normalize-tags-input — normalizeTagsInput. */
describe('BlogPostComponent normalizeTagsInput (golden WU)', () => {
  it('splits, trims, and dedupes tags case-insensitively', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as any;
    expect(cmp.normalizeTagsInput('a, B, a,  ')).toEqual(['a', 'B']);
    expect(cmp.normalizeTagsInput('')).toEqual([]);
  });
});
