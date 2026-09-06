import { signal } from '@angular/core';
import { HeaderComponent } from './header.component';

/** Golden WU header-banner-text — bannerText. */
describe('HeaderComponent bannerText (golden WU)', () => {
  function bare(language: string, banner: any): HeaderComponent {
    const cmp = Object.create(HeaderComponent.prototype) as HeaderComponent;
    Object.assign(cmp as any, {
      languageSig: signal(language === 'ro' ? 'ro' : 'en'),
      banner: signal(banner),
    });
    return cmp;
  }

  it('prefers language message then fallback, trimming empties', () => {
    expect(bare('en', null).bannerText()).toBeNull();
    expect(bare('en', { message_en: ' Hello ', message_ro: 'Salut' }).bannerText()).toBe('Hello');
    expect(bare('ro', { message_en: 'Hello', message_ro: '  Salut  ' }).bannerText()).toBe('Salut');
    expect(bare('ro', { message_en: 'Hello', message_ro: '   ' }).bannerText()).toBe('Hello');
    expect(bare('en', { message_en: '', message_ro: '' }).bannerText()).toBeNull();
  });
});
