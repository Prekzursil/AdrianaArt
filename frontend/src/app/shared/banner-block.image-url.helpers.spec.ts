import { BannerBlockComponent } from './banner-block.component';

/** Golden WU banner-image-url — imageUrl. */
describe('BannerBlockComponent imageUrl (golden WU)', () => {
  it('trims slide image_url', () => {
    const cmp = Object.create(BannerBlockComponent.prototype) as BannerBlockComponent;
    Object.assign(cmp as any, { slide: { image_url: '  /img.jpg  ' } });
    expect(cmp.imageUrl()).toBe('/img.jpg');
    Object.assign(cmp as any, { slide: { image_url: '' } });
    expect(cmp.imageUrl()).toBe('');
  });
});
