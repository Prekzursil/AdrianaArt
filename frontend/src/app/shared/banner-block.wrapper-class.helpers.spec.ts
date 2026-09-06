import { BannerBlockComponent } from './banner-block.component';

/** Golden WU banner-block-wrapper-class — wrapperClass. */
describe('BannerBlockComponent wrapperClass (golden WU)', () => {
  it('returns an empty class string', () => {
    const cmp = Object.create(BannerBlockComponent.prototype) as BannerBlockComponent;
    expect(cmp.wrapperClass()).toBe('');
  });
});
