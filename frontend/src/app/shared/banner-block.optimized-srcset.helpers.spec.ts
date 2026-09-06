import { BannerBlockComponent } from './banner-block.component';

/** Golden WU banner-block-optimized-srcset — optimizedSrcset. */
describe('BannerBlockComponent optimizedSrcset (golden WU)', () => {
  it('builds width entries for optimized assets and returns empty otherwise', () => {
    const cmp = Object.create(BannerBlockComponent.prototype) as BannerBlockComponent;
    Object.assign(cmp as any, { slide: { image_url: 'assets/other.jpg' } });
    expect(cmp.optimizedSrcset('webp')).toBe('');
    Object.assign(cmp as any, { slide: { image_url: 'assets/home/banner_image.jpeg' } });
    const webp = cmp.optimizedSrcset('webp');
    expect(webp).toContain('assets/home/banner_image-640.webp 640w');
    expect(webp).toContain('assets/home/banner_image-1280.webp 1280w');
    const jpg = cmp.optimizedSrcset('jpg');
    expect(jpg).toContain('assets/home/banner_image.jpeg 1280w');
    expect(jpg).toContain('assets/home/banner_image-640.jpg 640w');
  });
});
