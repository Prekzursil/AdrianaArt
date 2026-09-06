import { BannerBlockComponent } from './banner-block.component';

/** Golden WU banner-block-sub-text-class — subTextClass. */
describe('BannerBlockComponent subTextClass (golden WU)', () => {
  it('maps text_style to muted vs body utilities', () => {
    const cmp = Object.create(BannerBlockComponent.prototype) as BannerBlockComponent;
    Object.assign(cmp as any, { slide: { text_style: 'light' } });
    expect(cmp.subTextClass()).toBe('text-text-muted');
    Object.assign(cmp as any, { slide: { text_style: 'dark' } });
    expect(cmp.subTextClass()).toBe('text-text');
  });
});
