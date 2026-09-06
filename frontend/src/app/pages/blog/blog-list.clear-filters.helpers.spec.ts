import { BlogListComponent } from './blog-list.component';

/** Golden WU blog-list-clear-filters-helpers. */
describe('BlogListComponent clearFilters (golden WU)', () => {
  it('clearFilters resets queries and navigates', () => {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    Object.assign(cmp as any, {
      searchQuery: 'a',
      tagQuery: 'b',
      seriesQuery: 'c',
      router: { navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true)) },
    });
    cmp.clearFilters();
    expect((cmp as any).searchQuery).toBe('');
    expect((cmp as any).tagQuery).toBe('');
    expect((cmp as any).seriesQuery).toBe('');
    expect((cmp as any).router.navigate).toHaveBeenCalled();
  });
});
