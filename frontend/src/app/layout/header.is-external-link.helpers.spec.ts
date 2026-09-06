import { HeaderComponent } from './header.component';

/** Golden WU header-is-external-link — isExternalLink. */
describe('HeaderComponent isExternalLink (golden WU)', () => {
  function bare(): HeaderComponent {
    return Object.create(HeaderComponent.prototype) as HeaderComponent;
  }

  it('detects http(s) urls only', () => {
    const cmp = bare();
    expect(cmp.isExternalLink('https://x.test')).toBe(true);
    expect(cmp.isExternalLink('http://x.test')).toBe(true);
    expect(cmp.isExternalLink('/shop')).toBe(false);
    expect(cmp.isExternalLink('  ')).toBe(false);
  });
});
