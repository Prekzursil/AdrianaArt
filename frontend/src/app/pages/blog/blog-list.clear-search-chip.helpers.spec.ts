import { BlogListComponent } from './blog-list.component';

describe('BlogListComponent clearSearchChip (golden WU)', () => {
  function make(searchQuery: string) {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    (cmp as any).searchQuery = searchQuery;
    (cmp as any).applyFilters = jasmine.createSpy('applyFilters');
    return cmp;
  }

  it('clears non-empty search and reapplies filters; no-ops when blank', () => {
    const blank = make('   ');
    blank.clearSearchChip();
    expect(blank.searchQuery).toBe('   ');
    expect((blank as any).applyFilters).not.toHaveBeenCalled();

    const cmp = make(' ceramics ');
    cmp.clearSearchChip();
    expect(cmp.searchQuery).toBe('');
    expect((cmp as any).applyFilters).toHaveBeenCalled();
  });
});
