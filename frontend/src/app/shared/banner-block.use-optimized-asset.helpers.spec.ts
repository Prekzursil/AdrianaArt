import { BannerBlockComponent } from './banner-block.component';

/** Golden WU banner-block-use-optimized-asset — useOptimizedAsset. */
describe('BannerBlockComponent useOptimizedAsset (golden WU)', () => {
  it('detects the home banner optimized asset prefix and jpeg fallback', () => {
    const cmp = Object.create(BannerBlockComponent.prototype) as BannerBlockComponent;
    Object.assign(cmp as any, { slide: { image_url: '/assets/home/banner_image.jpeg' } });
    expect(cmp.useOptimizedAsset()).toBe(true);
    Object.assign(cmp as any, { slide: { image_url: 'assets/home/banner_image-960.webp' } });
    expect(cmp.useOptimizedAsset()).toBe(true);
    Object.assign(cmp as any, { slide: { image_url: 'https://cdn.example/other.jpg' } });
    expect(cmp.useOptimizedAsset()).toBe(false);
  });
});
