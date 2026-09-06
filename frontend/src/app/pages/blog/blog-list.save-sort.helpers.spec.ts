import { BlogListComponent } from './blog-list.component';

/** Golden WU blog-list-save-sort -- saveSort. */
describe('BlogListComponent saveSort (golden WU)', () => {
  afterEach(() => localStorage.clear());

  it('writes blog_sort when localStorage is available', () => {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    (cmp as any).document = { defaultView: window };
    (cmp as any).saveSort('oldest');
    expect(localStorage.getItem('blog_sort')).toBe('oldest');
  });
});
