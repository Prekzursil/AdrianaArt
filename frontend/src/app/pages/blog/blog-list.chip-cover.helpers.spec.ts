import { BlogListComponent } from './blog-list.component';

/** Golden WU blog-list-chip-cover-helpers. */
describe('BlogListComponent chip/cover helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): BlogListComponent {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    Object.assign(cmp as any, {
      searchQuery: '',
      tagQuery: '',
      seriesQuery: '',
      storefrontAdminMode: { enabled: () => false },
      failedThumbs: new Set<string>(),
      ...overrides,
    });
    return cmp;
  }

  it('hasActiveFilters detects any chip query', () => {
    expect(bare().hasActiveFilters()).toBe(false);
    expect(bare({ searchQuery: 'x' }).hasActiveFilters()).toBe(true);
    expect(bare({ tagQuery: 'news' }).hasActiveFilters()).toBe(true);
  });

  it('coverImageClass / canEditBlog / focalPosition', () => {
    expect(bare().coverImageClass('contain')).toContain('object-contain');
    expect(bare().coverImageClass('cover')).toBe('object-cover');
    expect(bare().canEditBlog()).toBe(false);
    expect(bare({ storefrontAdminMode: { enabled: () => true } }).canEditBlog()).toBe(true);
    expect(bare().focalPosition()).toBe('50% 50%');
    expect(bare().focalPosition(120, -1)).toBe('100% 0%');
  });

  it('thumbUrl builds -sm media path and respects failures', () => {
    const cmp = bare();
    expect(cmp.thumbUrl('/media/a/b.jpg')).toBe('/media/a/b-sm.jpg');
    expect(cmp.thumbUrl('https://x/y.jpg')).toBeNull();
    cmp.markThumbFailed('/media/a/b-sm.jpg');
    expect(cmp.thumbUrl('/media/a/b.jpg')).toBeNull();
  });
});
