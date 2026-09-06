import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent cloneMeta (golden WU)', () => {
  it('deep-clones meta and falls back for null/circular', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as any;
    expect(cmp.cloneMeta(null)).toEqual({});
    const meta = { tags: ['a'], nested: { x: 1 } };
    const cloned = cmp.cloneMeta(meta);
    expect(cloned).toEqual(meta);
    expect(cloned).not.toBe(meta);
    expect(cloned.nested).not.toBe(meta.nested);
    const circular: any = {};
    circular.self = circular;
    const fallback = cmp.cloneMeta(circular);
    expect(fallback.self).toBe(fallback);
  });
});
