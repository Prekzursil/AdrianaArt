import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-root-comments — rootComments. */
describe('BlogPostComponent rootComments (golden WU)', () => {
  it('filters to comments without parent_id', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).comments = () => [
      { id: '1', parent_id: null },
      { id: '2', parent_id: '1' },
      { id: '3', parent_id: undefined },
    ];
    expect(cmp.rootComments().map((c: any) => c.id)).toEqual(['1', '3']);
  });
});
