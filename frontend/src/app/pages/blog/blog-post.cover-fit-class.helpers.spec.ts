import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-cover-fit-class — coverImageClass. */
describe('BlogPostComponent coverImageClass (golden WU)', () => {
  it('maps contain vs default cover object-fit classes', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    expect(cmp.coverImageClass('contain')).toContain('object-contain');
    expect(cmp.coverImageClass('cover')).toContain('object-cover');
    expect(cmp.coverImageClass(null)).toContain('object-cover');
  });
});
