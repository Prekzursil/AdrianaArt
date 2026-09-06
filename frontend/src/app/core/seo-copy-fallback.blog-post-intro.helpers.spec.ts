import { SeoCopyFallbackService } from './seo-copy-fallback.service';

/** Golden WU seo-copy-blog-post-intro — blogPostIntro. */
describe('SeoCopyFallbackService blogPostIntro (golden WU)', () => {
  it('returns EN and RO intros including the title', () => {
    const svc = new SeoCopyFallbackService();
    const en = svc.blogPostIntro('en', 'Craft Tips');
    const ro = svc.blogPostIntro('ro', 'Sfaturi');
    expect(en).toContain('Craft Tips');
    expect(en).toContain('easy-to-scan format');
    expect(ro).toContain('Sfaturi');
    expect(ro).toContain('punctele cheie');
  });
});
