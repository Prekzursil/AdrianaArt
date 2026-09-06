import { signal } from '@angular/core';
import { HeaderComponent } from './header.component';

/** Golden WU header-banner-link-label — bannerLinkLabel. */
describe('HeaderComponent bannerLinkLabel (golden WU)', () => {
  function bare(language: string, banner: any): HeaderComponent {
    const cmp = Object.create(HeaderComponent.prototype) as HeaderComponent;
    Object.assign(cmp as any, {
      languageSig: signal(language === 'ro' ? 'ro' : 'en'),
      banner: signal(banner),
    });
    return cmp;
  }

  it('prefers language link label then fallback', () => {
    expect(bare('en', null).bannerLinkLabel()).toBeNull();
    expect(
      bare('en', { link_label_en: ' Shop ', link_label_ro: 'Magazin' }).bannerLinkLabel(),
    ).toBe('Shop');
    expect(
      bare('ro', { link_label_en: 'Shop', link_label_ro: '  Magazin  ' }).bannerLinkLabel(),
    ).toBe('Magazin');
    expect(bare('ro', { link_label_en: 'Shop', link_label_ro: '  ' }).bannerLinkLabel()).toBe(
      'Shop',
    );
    expect(bare('en', { link_label_en: '', link_label_ro: '' }).bannerLinkLabel()).toBeNull();
  });
});
