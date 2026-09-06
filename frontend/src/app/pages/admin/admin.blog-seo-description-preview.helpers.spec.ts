import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-seo-description-preview — blogSeoDescriptionPreview. */
describe('AdminComponent blogSeoDescriptionPreview (golden WU)', () => {
  it('truncates the SEO description source for preview', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).blogSeoDescriptionSource = () => 'y'.repeat(200);
    const preview = cmp.blogSeoDescriptionPreview('ro' as any);
    expect(preview.endsWith('…')).toBe(true);
    expect(preview.length).toBe(160);
  });
});
