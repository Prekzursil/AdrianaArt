import { HomeComponent } from './home.component';

describe('HomeComponent asBannerBlock (golden WU)', () => {
  it('returns banner blocks only', () => {
    const cmp = Object.create(HomeComponent.prototype) as any;
    const banner = { type: 'banner', title: 'Hi' };
    expect(cmp.asBannerBlock(banner)).toBe(banner);
    expect(cmp.asBannerBlock({ type: 'image' })).toBeNull();
  });
});
