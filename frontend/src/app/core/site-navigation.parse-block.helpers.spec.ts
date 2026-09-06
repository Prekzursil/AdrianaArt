import { SiteNavigationService } from './site-navigation.service';

/** Golden WU site-navigation-parse-block — parseBlock. */
describe('SiteNavigationService parseBlock (golden WU)', () => {
  it('returns null when all link groups empty; otherwise maps groups', () => {
    const svc = Object.create(SiteNavigationService.prototype) as SiteNavigationService;
    Object.assign(svc as any, { cleanLinks: () => [] });
    expect((svc as any).parseBlock({ meta: {} })).toBeNull();

    const header = [{ id: 'h', url: '/h', label: { en: 'H', ro: 'H' } }];
    Object.assign(svc as any, {
      cleanLinks: (v: unknown) => (v === 'header' ? header : []),
    });
    expect(
      (svc as any).parseBlock({
        meta: {
          header_links: 'header',
          footer_handcrafted_links: 'fh',
          footer_legal_links: 'fl',
        },
      }),
    ).toEqual({
      headerLinks: header,
      footerHandcraftedLinks: [],
      footerLegalLinks: [],
    });
  });
});
