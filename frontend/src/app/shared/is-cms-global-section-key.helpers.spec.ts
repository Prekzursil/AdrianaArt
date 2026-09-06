import { isCmsGlobalSectionKey } from './cms-global-sections';

describe('isCmsGlobalSectionKey (golden WU)', () => {
  it('accepts known keys only', () => {
    expect(isCmsGlobalSectionKey('site.announcement')).toBe(true);
    expect(isCmsGlobalSectionKey('site.header-banners')).toBe(true);
    expect(isCmsGlobalSectionKey('site.footer-promo')).toBe(true);
    expect(isCmsGlobalSectionKey('site.other')).toBe(false);
    expect(isCmsGlobalSectionKey(null)).toBe(false);
    expect(isCmsGlobalSectionKey(1)).toBe(false);
  });
});
