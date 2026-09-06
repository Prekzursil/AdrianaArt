import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-seo-title-preview — blogSeoTitlePreview. */
describe('AdminComponent blogSeoTitlePreview (golden WU)', () => {
  it('truncates the full SEO title for preview', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).blogSeoTitleFull = () => 'A'.repeat(80);
    (cmp as any).truncateForPreview = AdminComponent.prototype['truncateForPreview'];
    // call through real private via prototype binding
    const preview = cmp.blogSeoTitlePreview('ro' as any);
    expect(preview.endsWith('…')).toBe(true);
    expect(preview.length).toBe(62);
  });
});
