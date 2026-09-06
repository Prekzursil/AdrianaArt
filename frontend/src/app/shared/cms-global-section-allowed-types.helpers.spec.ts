import { cmsGlobalSectionAllowedTypes } from './cms-global-sections';

describe('cmsGlobalSectionAllowedTypes (golden WU)', () => {
  it('returns allowedTypes or null', () => {
    expect(cmsGlobalSectionAllowedTypes('site.announcement')).toEqual(['text']);
    expect(cmsGlobalSectionAllowedTypes('site.footer-promo')).toContain('gallery');
    expect(cmsGlobalSectionAllowedTypes('nope')).toBeNull();
  });
});
