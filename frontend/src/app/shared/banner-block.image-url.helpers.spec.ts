import { BannerBlockComponent } from './banner-block.component';

/** Golden WU banner-block-image-url — imageUrl. */
describe('BannerBlockComponent imageUrl (golden WU)', () => {
  it('returns trimmed slide image_url or empty', () => {
    const cmp = Object.create(BannerBlockComponent.prototype) as BannerBlockComponent;
    Object.assign(cmp as any, { slide: null });
    expect(cmp.imageUrl()).toBe('');
    Object.assign(cmp as any, { slide: { image_url: '  /img.jpg  ' } });
    expect(cmp.imageUrl()).toBe('/img.jpg');
  });
});
