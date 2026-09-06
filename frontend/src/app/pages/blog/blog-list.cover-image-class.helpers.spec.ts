import { BlogListComponent } from './blog-list.component';

/** Golden WU blog-list-cover-image-class -- coverImageClass. */
describe('BlogListComponent coverImageClass (golden WU)', () => {
  it('returns contain classes or object-cover default', () => {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    expect(cmp.coverImageClass('contain')).toBe(
      'object-contain bg-slate-50 dark:bg-slate-900',
    );
    expect(cmp.coverImageClass('cover')).toBe('object-cover');
    expect(cmp.coverImageClass(null)).toBe('object-cover');
  });
});
