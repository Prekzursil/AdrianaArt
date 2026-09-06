import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-seo-issues — blogSeoIssues. */
describe('AdminComponent blogSeoIssues (golden WU)', () => {
  it('flags missing title/description and length problems', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).blogSeoTitleFull = () => '';
    (cmp as any).blogSeoDescriptionFull = () => '';
    (cmp as any).blogSeoDescriptionSource = () => '';
    (cmp as any).getBlogSummary = () => '';
    (cmp as any).blogPreviewToken = '';
    (cmp as any).blogForm = { status: 'draft' };
    const keys = cmp.blogSeoIssues('en' as any).map((i: any) => i.key);
    expect(keys).toContain('adminUi.blog.seo.issues.missingTitle');
    expect(keys).toContain('adminUi.blog.seo.issues.missingDescription');
    expect(keys).toContain('adminUi.blog.seo.issues.previewTokenRecommended');

    (cmp as any).blogSeoTitleFull = () => 'A'.repeat(80);
    (cmp as any).blogSeoDescriptionFull = () => 'B'.repeat(40);
    (cmp as any).blogSeoDescriptionSource = () => 'C'.repeat(200);
    (cmp as any).getBlogSummary = () => '';
    (cmp as any).blogPreviewToken = 'tok';
    (cmp as any).blogForm = { status: 'published' };
    const keys2 = cmp.blogSeoIssues('en' as any).map((i: any) => i.key);
    expect(keys2).toContain('adminUi.blog.seo.issues.titleTooLong');
    expect(keys2).toContain('adminUi.blog.seo.issues.descriptionTooLong');
    expect(keys2).toContain('adminUi.blog.seo.issues.descriptionTooShort');
    expect(keys2).toContain('adminUi.blog.seo.issues.derivedFromBody');
  });
});
