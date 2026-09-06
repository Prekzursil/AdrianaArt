import { BannerBlockComponent } from './banner-block.component';

/** Golden WU banner-block-focal-position — focalPosition. */
describe('BannerBlockComponent focalPosition (golden WU)', () => {
  function bare(slide: any): BannerBlockComponent {
    const cmp = Object.create(BannerBlockComponent.prototype) as BannerBlockComponent;
    Object.assign(cmp as any, { slide });
    return cmp;
  }

  it('clamps and rounds focal_x/focal_y percents', () => {
    expect(bare({}).focalPosition()).toBe('50% 50%');
    expect(bare({ focal_x: 12.6, focal_y: 87.2 }).focalPosition()).toBe('13% 87%');
    expect(bare({ focal_x: -10, focal_y: 150 }).focalPosition()).toBe('0% 100%');
  });
});
