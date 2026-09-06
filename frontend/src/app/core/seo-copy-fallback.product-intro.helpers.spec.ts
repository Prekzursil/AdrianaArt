import { SeoCopyFallbackService } from './seo-copy-fallback.service';

/** Golden WU seo-copy-product-intro — productIntro. */
describe('SeoCopyFallbackService productIntro (golden WU)', () => {
  it('includes category when provided for EN and RO', () => {
    const svc = new SeoCopyFallbackService();
    const en = svc.productIntro('en', 'Vase', 'Ceramics');
    const ro = svc.productIntro('ro', 'Vaza', 'Ceramica');
    expect(en).toContain('Vase');
    expect(en).toContain('Ceramics');
    expect(ro).toContain('Vaza');
    expect(ro).toContain('Ceramica');
  });
});
