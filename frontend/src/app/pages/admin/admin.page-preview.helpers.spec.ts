import { AdminComponent } from './admin.component';

/** Golden WU admin-page-preview-helpers — slug/path/share/iframe. */
describe('AdminComponent page-preview helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    Object.assign(cmp as any, {
      pagePreviewToken: null,
      pagePreviewForSlug: null,
      pagePreviewOrigin: null,
      pagePreviewNonce: 0,
      cmsPrefs: {
        previewLang: () => 'en',
        previewTheme: () => 'light',
      },
      sanitizer: {
        bypassSecurityTrustResourceUrl: (v: string) => ({ bypass: v }),
      },
      ...overrides,
    });
    return cmp;
  }

  it('pagePreviewSlug extracts page.* slug or null', () => {
    const cmp = bare();
    expect(cmp.pagePreviewSlug('page.about' as any)).toBe('about');
    expect(cmp.pagePreviewSlug('page.custom-slug' as any)).toBe('custom-slug');
    expect(cmp.pagePreviewSlug('page.' as any)).toBeNull();
    expect(cmp.pagePreviewSlug('home.hero' as any)).toBeNull();
    expect(cmp.pagePreviewSlug('' as any)).toBeNull();
  });

  it('pagePublicPath maps about/contact/empty/custom', () => {
    const cmp = bare();
    expect(cmp.pagePublicPath('')).toBe('/pages');
    expect(cmp.pagePublicPath('about')).toBe('/about');
    expect(cmp.pagePublicPath('contact')).toBe('/contact');
    expect(cmp.pagePublicPath('shipping')).toBe('/pages/shipping');
  });

  it('pagePreviewShareUrl requires matching token and builds query', () => {
    const cmp = bare({
      pagePreviewOrigin: 'https://shop.test',
      pagePreviewToken: 'tok-1',
      pagePreviewForSlug: 'about',
    });
    expect(cmp.pagePreviewShareUrl('')).toBeNull();
    expect(cmp.pagePreviewShareUrl('contact')).toBeNull();

    const url = cmp.pagePreviewShareUrl('about')!;
    expect(url.startsWith('https://shop.test/about?')).toBe(true);
    expect(url).toContain('preview=tok-1');
    expect(url).toContain('lang=en');
    expect(url).toContain('theme=light');

    const cmpNoToken = bare({ pagePreviewForSlug: 'about', pagePreviewOrigin: 'https://shop.test' });
    expect(cmpNoToken.pagePreviewShareUrl('about')).toBeNull();
  });

  it('pagePreviewIframeSrc wraps share URL with __ts nonce', () => {
    const cmp = bare({
      pagePreviewOrigin: 'https://shop.test',
      pagePreviewToken: 'tok-2',
      pagePreviewForSlug: 'about',
      pagePreviewNonce: 42,
    });
    expect(cmp.pagePreviewIframeSrc('contact')).toBeNull();

    const trusted = cmp.pagePreviewIframeSrc('about') as any;
    expect(trusted.bypass).toContain('preview=tok-2');
    expect(trusted.bypass).toContain('__ts=42');
  });
});
