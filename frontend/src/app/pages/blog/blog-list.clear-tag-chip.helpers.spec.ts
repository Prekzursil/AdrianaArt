import { BlogListComponent } from './blog-list.component';

describe('BlogListComponent clearTagChip (golden WU)', () => {
  function make(tagQuery: string) {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    (cmp as any).tagQuery = tagQuery;
    (cmp as any).applyFilters = jasmine.createSpy('applyFilters');
    return cmp;
  }

  it('clears non-empty tag and reapplies filters; no-ops when blank', () => {
    const blank = make('');
    blank.clearTagChip();
    expect((blank as any).applyFilters).not.toHaveBeenCalled();
    const cmp = make('clay');
    cmp.clearTagChip();
    expect(cmp.tagQuery).toBe('');
    expect((cmp as any).applyFilters).toHaveBeenCalled();
  });
});
