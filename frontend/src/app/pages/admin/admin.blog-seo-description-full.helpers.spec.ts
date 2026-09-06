import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-seo-description-full — blogSeoDescriptionFull. */
describe('AdminComponent blogSeoDescriptionFull (golden WU)', () => {
  it('slices the SEO description source to 160 chars', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).blogSeoDescriptionSource = () => 'x'.repeat(200) + '  ';
    expect(cmp.blogSeoDescriptionFull('en' as any)).toBe('x'.repeat(160));
  });
});
