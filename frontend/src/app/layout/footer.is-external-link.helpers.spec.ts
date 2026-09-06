import { FooterComponent } from './footer.component';

/** Golden WU footer-is-external-link — isExternalLink. */
describe('FooterComponent isExternalLink (golden WU)', () => {
  function bare(): FooterComponent {
    return Object.create(FooterComponent.prototype) as FooterComponent;
  }

  it('detects http(s) urls only', () => {
    const cmp = bare();
    expect(cmp.isExternalLink('https://example.com')).toBe(true);
    expect(cmp.isExternalLink('http://example.com')).toBe(true);
    expect(cmp.isExternalLink(' /about ')).toBe(false);
    expect(cmp.isExternalLink('')).toBe(false);
    expect(cmp.isExternalLink('ftp://x')).toBe(false);
  });
});
