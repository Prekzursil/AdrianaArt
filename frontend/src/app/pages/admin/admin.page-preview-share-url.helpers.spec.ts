import { AdminComponent } from './admin.component';

/** Golden WU admin-page-preview-share-url — pagePreviewShareUrl. */
describe('AdminComponent pagePreviewShareUrl (golden WU)', () => {
  it('returns null without matching token; else builds preview URL', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).pagePreviewToken = null;
    (cmp as any).pagePreviewForSlug = null;
    (cmp as any).pagePreviewOrigin = 'https://example.test';
    (cmp as any).cmsPrefs = { previewLang: () => 'en', previewTheme: () => 'light' };
    (cmp as any).pagePublicPath = (slug: string) =>
      slug === 'about' ? '/about' : `/pages/${slug}`;
    expect(cmp.pagePreviewShareUrl('')).toBeNull();
    expect(cmp.pagePreviewShareUrl('about')).toBeNull();

    (cmp as any).pagePreviewToken = 'tok';
    (cmp as any).pagePreviewForSlug = 'about';
    const url = cmp.pagePreviewShareUrl('about')!;
    expect(url.startsWith('https://example.test/about?')).toBe(true);
    expect(url).toContain('preview=tok');
    expect(url).toContain('lang=en');
    expect(url).toContain('theme=light');
    expect(cmp.pagePreviewShareUrl('contact')).toBeNull();
  });
});
