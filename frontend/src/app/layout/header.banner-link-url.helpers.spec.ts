import { signal } from '@angular/core';
import { HeaderComponent } from './header.component';

/** Golden WU header-banner-link-url — bannerLinkUrl. */
describe('HeaderComponent bannerLinkUrl (golden WU)', () => {
  function bare(banner: any): HeaderComponent {
    const cmp = Object.create(HeaderComponent.prototype) as HeaderComponent;
    Object.assign(cmp as any, { banner: signal(banner) });
    return cmp;
  }

  it('returns trimmed link_url or null', () => {
    expect(bare(null).bannerLinkUrl()).toBeNull();
    expect(bare({ link_url: '  /shop  ' }).bannerLinkUrl()).toBe('/shop');
    expect(bare({ link_url: '   ' }).bannerLinkUrl()).toBeNull();
  });
});
