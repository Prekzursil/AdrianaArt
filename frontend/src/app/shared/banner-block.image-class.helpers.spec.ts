import { BannerBlockComponent } from './banner-block.component';

/** Golden WU banner-block-image-class — imageClass. */
describe('BannerBlockComponent imageClass (golden WU)', () => {
  it('maps slide size tokens to aspect utility classes', () => {
    const cmp = Object.create(BannerBlockComponent.prototype) as BannerBlockComponent;
    Object.assign(cmp as any, { slide: { size: 'S' } });
    expect(cmp.imageClass()).toContain('aspect-[16/8]');
    Object.assign(cmp as any, { slide: { size: 'L' } });
    expect(cmp.imageClass()).toContain('aspect-[5/4]');
    Object.assign(cmp as any, { slide: { size: 'M' } });
    expect(cmp.imageClass()).toContain('aspect-video');
    expect(cmp.imageClass()).toContain('rounded-2xl');
  });
});
