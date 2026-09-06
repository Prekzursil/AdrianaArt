import { signal } from '@angular/core';
import { HeaderComponent } from './header.component';

/** Golden WU header-banner-classes — bannerClasses. */
describe('HeaderComponent bannerClasses (golden WU)', () => {
  function bare(level: string | undefined): HeaderComponent {
    const cmp = Object.create(HeaderComponent.prototype) as HeaderComponent;
    Object.assign(cmp as any, {
      banner: signal(level === undefined ? null : { level }),
    });
    return cmp;
  }

  it('maps banner level to theme classes', () => {
    expect(bare(undefined).bannerClasses()).toContain('bg-accent-subtle');
    expect(bare('info').bannerClasses()).toContain('bg-accent-subtle');
    expect(bare('WARNING').bannerClasses()).toContain('bg-amber-50');
    expect(bare('promo').bannerClasses()).toContain('bg-emerald-50');
  });
});
