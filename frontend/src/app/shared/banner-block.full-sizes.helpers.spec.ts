import { BannerBlockComponent } from './banner-block.component';

/** Golden WU banner-full-sizes — fullSizes. */
describe('BannerBlockComponent fullSizes (golden WU)', () => {
  it('returns the full sizes attribute', () => {
    const cmp = Object.create(BannerBlockComponent.prototype) as BannerBlockComponent;
    expect(cmp.fullSizes()).toBe('(min-width: 1024px) 1152px, 100vw');
  });
});
