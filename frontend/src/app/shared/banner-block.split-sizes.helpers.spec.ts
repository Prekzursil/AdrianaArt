import { BannerBlockComponent } from './banner-block.component';

/** Golden WU banner-block-split-sizes — splitSizes. */
describe('BannerBlockComponent splitSizes (golden WU)', () => {
  it('returns the split layout sizes attribute', () => {
    const cmp = Object.create(BannerBlockComponent.prototype) as BannerBlockComponent;
    expect(cmp.splitSizes()).toBe('(min-width: 1024px) 680px, 100vw');
  });
});
