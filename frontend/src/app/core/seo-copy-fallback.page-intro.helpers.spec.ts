import { SeoCopyFallbackService } from './seo-copy-fallback.service';

/** Golden WU seo-copy-page-intro — pageIntro. */
describe('SeoCopyFallbackService pageIntro (golden WU)', () => {
  it('returns EN and RO intros including the title', () => {
    const svc = new SeoCopyFallbackService();
    const en = svc.pageIntro('en', 'Shipping');
    const ro = svc.pageIntro('ro', 'Livrare');
    expect(en).toContain('Shipping');
    expect(en.startsWith('Find essential information')).toBe(true);
    expect(ro).toContain('Livrare');
    expect(ro.startsWith('Gaseste informatii esentiale')).toBe(true);
  });
});
