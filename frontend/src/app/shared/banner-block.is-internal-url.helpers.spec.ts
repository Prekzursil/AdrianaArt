import { BannerBlockComponent } from './banner-block.component';

/** Golden WU banner-block-is-internal-url — isInternalUrl. */
describe('BannerBlockComponent isInternalUrl (golden WU)', () => {
  function bare(): BannerBlockComponent {
    return Object.create(BannerBlockComponent.prototype) as BannerBlockComponent;
  }

  it('accepts root-relative paths only', () => {
    const cmp = bare();
    expect(cmp.isInternalUrl('/shop')).toBe(true);
    expect(cmp.isInternalUrl('  /about  ')).toBe(true);
    expect(cmp.isInternalUrl('//evil.test')).toBe(false);
    expect(cmp.isInternalUrl('https://x.test')).toBe(false);
    expect(cmp.isInternalUrl('')).toBe(false);
    expect(cmp.isInternalUrl(null)).toBe(false);
  });
});
