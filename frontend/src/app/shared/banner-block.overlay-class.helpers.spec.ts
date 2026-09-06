import { BannerBlockComponent } from './banner-block.component';

/** Golden WU banner-block-overlay-class — overlayClass. */
describe('BannerBlockComponent overlayClass (golden WU)', () => {
  it('switches overlay gradient by text_style', () => {
    const cmp = Object.create(BannerBlockComponent.prototype) as BannerBlockComponent;
    Object.assign(cmp as any, { slide: { text_style: 'light' } });
    expect(cmp.overlayClass()).toContain('from-overlay/70');
    Object.assign(cmp as any, { slide: { text_style: 'dark' } });
    expect(cmp.overlayClass()).toContain('from-background/80');
  });
});
