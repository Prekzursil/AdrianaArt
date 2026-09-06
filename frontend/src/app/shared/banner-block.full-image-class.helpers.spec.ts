import { BannerBlockComponent } from './banner-block.component';

/** Golden WU banner-block-full-image-class — fullImageClass. */
describe('BannerBlockComponent fullImageClass (golden WU)', () => {
  it('maps slide size tokens to full-bleed aspect classes', () => {
    const cmp = Object.create(BannerBlockComponent.prototype) as BannerBlockComponent;
    Object.assign(cmp as any, { slide: { size: 'S' } });
    expect(cmp.fullImageClass()).toContain('aspect-[16/5]');
    Object.assign(cmp as any, { slide: { size: 'L' } });
    expect(cmp.fullImageClass()).toContain('aspect-[16/7]');
    Object.assign(cmp as any, { slide: { size: 'X' } });
    expect(cmp.fullImageClass()).toContain('aspect-video');
  });
});
