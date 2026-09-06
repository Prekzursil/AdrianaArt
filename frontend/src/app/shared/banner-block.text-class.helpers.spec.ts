import { BannerBlockComponent } from './banner-block.component';

/** Golden WU banner-text-class — textClass. */
describe('BannerBlockComponent textClass (golden WU)', () => {
  it('maps text_style to heading classes', () => {
    const cmp = Object.create(BannerBlockComponent.prototype) as BannerBlockComponent;
    Object.assign(cmp as any, { slide: { text_style: 'light' } });
    expect(cmp.textClass()).toBe('text-onmedia');
    Object.assign(cmp as any, { slide: { text_style: 'dark' } });
    expect(cmp.textClass()).toBe('text-text-heading');
  });
});
