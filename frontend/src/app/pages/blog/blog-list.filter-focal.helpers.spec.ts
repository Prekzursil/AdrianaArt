import { BlogListComponent } from './blog-list.component';

describe('BlogListComponent filter/focal helpers (golden WU)', () => {
  function make(partial: Record<string, unknown> = {}) {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    Object.assign(cmp as any, {
      searchQuery: '',
      tagQuery: '',
      seriesQuery: '',
      storefrontAdminMode: { enabled: () => false },
      ...partial,
    });
    return cmp;
  }

  it('hasActiveFilters when any query chip non-empty', () => {
    expect(make().hasActiveFilters()).toBe(false);
    expect(make({ searchQuery: ' x ' }).hasActiveFilters()).toBe(true);
    expect(make({ tagQuery: 't' }).hasActiveFilters()).toBe(true);
    expect(make({ seriesQuery: 's' }).hasActiveFilters()).toBe(true);
  });

  it('canEditBlog mirrors storefrontAdminMode.enabled', () => {
    expect(make().canEditBlog()).toBe(false);
    expect(make({ storefrontAdminMode: { enabled: () => true } }).canEditBlog()).toBe(true);
  });

  it('focalPosition clamps 0..100 with 50 defaults', () => {
    const cmp = make();
    expect(cmp.focalPosition()).toBe('50% 50%');
    expect(cmp.focalPosition(-10, 150)).toBe('0% 100%');
    expect(cmp.focalPosition(33.4, 66.6)).toBe('33% 67%');
  });
});
