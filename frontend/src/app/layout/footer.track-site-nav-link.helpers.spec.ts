import { FooterComponent } from './footer.component';

/** Golden WU footer-track-site-nav-link — trackSiteNavLink. */
describe('FooterComponent trackSiteNavLink (golden WU)', () => {
  it('prefers trimmed id then url', () => {
    const cmp = Object.create(FooterComponent.prototype) as any;
    expect(cmp.trackSiteNavLink(0, { id: '  nav1  ', url: '/a' })).toBe('nav1');
    expect(cmp.trackSiteNavLink(0, { id: '  ', url: ' /b ' })).toBe('/b');
    expect(cmp.trackSiteNavLink(0, { id: '', url: '' })).toBe('');
  });
});
