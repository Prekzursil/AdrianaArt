import { BlogListComponent } from './blog-list.component';

describe('BlogListComponent clearSeriesChip (golden WU)', () => {
  function make(seriesQuery: string) {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    (cmp as any).seriesQuery = seriesQuery;
    (cmp as any).applyFilters = jasmine.createSpy('applyFilters');
    return cmp;
  }

  it('clears non-empty series and reapplies filters; no-ops when blank', () => {
    const blank = make(' ');
    blank.clearSeriesChip();
    expect((blank as any).applyFilters).not.toHaveBeenCalled();
    const cmp = make('glaze');
    cmp.clearSeriesChip();
    expect(cmp.seriesQuery).toBe('');
    expect((cmp as any).applyFilters).toHaveBeenCalled();
  });
});
