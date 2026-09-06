import { BlogListComponent } from './blog-list.component';

/** Golden WU blog-list-prefetch-post -- prefetchPost. */
describe('BlogListComponent prefetchPost (golden WU)', () => {
  it('prefetches trimmed slugs with normalized lang', () => {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    Object.assign(cmp as any, {
      translate: { currentLang: 'ro' },
      blog: { prefetchPost: jasmine.createSpy('prefetchPost') },
    });
    cmp.prefetchPost('  hello  ');
    expect((cmp as any).blog.prefetchPost).toHaveBeenCalledWith('hello', 'ro');
    cmp.prefetchPost('   ');
    expect((cmp as any).blog.prefetchPost).toHaveBeenCalledTimes(1);
  });
});
