import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-replies — replies. */
describe('BlogPostComponent replies (golden WU)', () => {
  it('returns comments whose parent_id matches', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).comments = () => [
      { id: '1', parent_id: null },
      { id: '2', parent_id: '1' },
      { id: '3', parent_id: '1' },
      { id: '4', parent_id: '9' },
    ];
    expect(cmp.replies('1').map((c: any) => c.id)).toEqual(['2', '3']);
    expect(cmp.replies('missing')).toEqual([]);
  });
});
