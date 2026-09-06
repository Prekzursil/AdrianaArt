import { SiteSocialService } from './site-social.service';

/** Golden WU site-social-clean-links — cleanLinks. */
describe('SiteSocialService cleanLinks (golden WU)', () => {
  it('returns null for non-arrays/empty; keeps trimmed label+url rows', () => {
    const svc = Object.create(SiteSocialService.prototype) as SiteSocialService;
    expect((svc as any).cleanLinks(null)).toBeNull();
    expect((svc as any).cleanLinks([])).toBeNull();
    expect(
      (svc as any).cleanLinks([
        { label: '  IG  ', url: ' https://ig  ', thumbnail_url: '  t  ' },
        { label: '', url: 'https://x' },
        null,
      ]),
    ).toEqual([{ label: 'IG', url: 'https://ig', thumbnail_url: 't' }]);
  });
});
