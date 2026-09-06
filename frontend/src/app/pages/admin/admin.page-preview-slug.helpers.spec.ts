import { AdminComponent } from './admin.component';

/** Golden WU admin-page-preview-slug — pagePreviewSlug. */
describe('AdminComponent pagePreviewSlug (golden WU)', () => {
  it('returns the page.* slug or null', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    expect(cmp.pagePreviewSlug('page.about' as any)).toBe('about');
    expect(cmp.pagePreviewSlug('page.custom-slug' as any)).toBe('custom-slug');
    expect(cmp.pagePreviewSlug('page.' as any)).toBeNull();
    expect(cmp.pagePreviewSlug('home.sections' as any)).toBeNull();
    expect(cmp.pagePreviewSlug('' as any)).toBeNull();
  });
});
