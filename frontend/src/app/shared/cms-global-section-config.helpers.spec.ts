import { cmsGlobalSectionConfig } from './cms-global-sections';

describe('cmsGlobalSectionConfig (golden WU)', () => {
  it('returns config or null', () => {
    expect(cmsGlobalSectionConfig('site.announcement')?.defaultTitle).toBe('Announcement bar');
    expect(cmsGlobalSectionConfig('site.header-banners')?.allowedTypes).toContain('banner');
    expect(cmsGlobalSectionConfig('missing')).toBeNull();
  });
});
