import { AdminComponent } from './admin.component';

/** Golden WU tip — pagePreviewIframeSrc. */
describe('AdminComponent pagePreviewIframeSrc (golden WU)', () => {
  it('returns null without share url; else trusted URL with __ts', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    Object.assign(cmp as any, {
      pagePreviewToken: 'tok',
      pagePreviewForSlug: 'about',
      pagePreviewOrigin: 'https://ex.test',
      pagePreviewNonce: 7,
      cmsPrefs: { previewLang: () => 'en', previewTheme: () => 'dark' },
      sanitizer: { bypassSecurityTrustResourceUrl: (v: string) => ({ bypass: v }) },
    });
    expect(cmp.pagePreviewIframeSrc('nope')).toBeNull();
    const trusted = cmp.pagePreviewIframeSrc('about') as any;
    expect(trusted.bypass).toContain('preview=tok');
    expect(trusted.bypass).toContain('lang=en');
    expect(trusted.bypass).toContain('theme=dark');
    expect(trusted.bypass).toContain('__ts=7');
  });
});
