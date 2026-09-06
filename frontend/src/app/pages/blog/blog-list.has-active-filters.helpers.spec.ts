import { BlogListComponent } from './blog-list.component';

/** Golden WU blog-list-has-active-filters — hasActiveFilters. */
describe('BlogListComponent hasActiveFilters (golden WU)', () => {
  it('is true when search/tag/series query is non-empty', () => {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    (cmp as any).searchQuery = ' ';
    (cmp as any).tagQuery = '';
    (cmp as any).seriesQuery = '';
    expect(cmp.hasActiveFilters()).toBe(false);
    (cmp as any).searchQuery = 'hello';
    expect(cmp.hasActiveFilters()).toBe(true);
    (cmp as any).searchQuery = '';
    (cmp as any).tagQuery = 'news';
    expect(cmp.hasActiveFilters()).toBe(true);
    (cmp as any).tagQuery = '';
    (cmp as any).seriesQuery = 's1';
    expect(cmp.hasActiveFilters()).toBe(true);
  });
});
