import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-author-label — authorLabel. */
describe('BlogPostComponent authorLabel (golden WU)', () => {
  it('delegates to formatIdentity with anonymous fallback', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).translate = { instant: (k: string) => `T:${k}` };
    // formatIdentity is module-level; exercise via real import path on prototype method
    expect(cmp.authorLabel(null)).toBe('T:blog.comments.anonymous');
    expect(cmp.authorLabel(undefined)).toBe('T:blog.comments.anonymous');
    expect(cmp.authorLabel({ name: 'Ann', username: 'ann', name_tag: 2 } as any)).toContain('Ann');
  });
});
