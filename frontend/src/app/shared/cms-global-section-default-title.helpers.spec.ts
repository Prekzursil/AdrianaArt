import { cmsGlobalSectionDefaultTitle } from './cms-global-sections';

describe('cmsGlobalSectionDefaultTitle (golden WU)', () => {
  it('returns defaultTitle or null', () => {
    expect(cmsGlobalSectionDefaultTitle('site.footer-promo')).toBe('Footer promo');
    expect(cmsGlobalSectionDefaultTitle('site.header-banners')).toBe('Header banners');
    expect(cmsGlobalSectionDefaultTitle('x')).toBeNull();
  });
});
