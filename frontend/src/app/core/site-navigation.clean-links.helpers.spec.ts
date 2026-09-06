import { SiteNavigationService } from './site-navigation.service';

/** Golden WU site-navigation-clean-links — cleanLinks. */
describe('SiteNavigationService cleanLinks (golden WU)', () => {
  it('keeps unique id/url/en+ro rows and skips invalid/duplicates', () => {
    const svc = Object.create(SiteNavigationService.prototype) as SiteNavigationService;
    expect((svc as any).cleanLinks(null)).toEqual([]);
    const out = (svc as any).cleanLinks([
      { id: 'a', url: ' /a ', label: { en: ' A ', ro: ' R ' } },
      { id: 'a', url: '/dup', label: { en: 'B', ro: 'B' } },
      { url: '/b', label: { en: 'B', ro: 'B' } },
      { url: '/x', label: { en: '', ro: 'R' } },
    ]);
    expect(out).toEqual([
      { id: 'a', url: '/a', label: { en: 'A', ro: 'R' } },
      { id: 'nav_3', url: '/b', label: { en: 'B', ro: 'B' } },
    ]);
  });
});
