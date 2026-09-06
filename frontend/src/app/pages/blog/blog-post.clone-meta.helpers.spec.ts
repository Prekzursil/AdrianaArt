import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent cloneMeta (golden WU)', () => {
  it('deep-clones meta and shallow-falls back when JSON.stringify fails', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as any;
    expect(cmp.cloneMeta(null)).toEqual({});
    const meta = { tags: ['a'], nested: { x: 1 } };
    const cloned = cmp.cloneMeta(meta);
    expect(cloned).toEqual(meta);
    expect(cloned).not.toBe(meta);
    expect(cloned.nested).not.toBe(meta.nested);

    const circular: any = { keep: 1 };
    circular.self = circular;
    const fallback = cmp.cloneMeta(circular);
    expect(fallback.keep).toBe(1);
    expect(fallback).not.toBe(circular);
    // shallow spread keeps the original circular edge
    expect(fallback.self).toBe(circular);
  });
});
