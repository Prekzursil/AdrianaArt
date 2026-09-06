import { BannerBlockComponent } from './banner-block.component';

/** Golden WU banner-block-normalize-asset-url — normalizeAssetUrl. */
describe('BannerBlockComponent normalizeAssetUrl (golden WU)', () => {
  it('trims and strips a leading slash', () => {
    const cmp = Object.create(BannerBlockComponent.prototype) as BannerBlockComponent;
    expect((cmp as any).normalizeAssetUrl(' /assets/x.jpg ')).toBe('assets/x.jpg');
    expect((cmp as any).normalizeAssetUrl('assets/x.jpg')).toBe('assets/x.jpg');
    expect((cmp as any).normalizeAssetUrl('')).toBe('');
  });
});
