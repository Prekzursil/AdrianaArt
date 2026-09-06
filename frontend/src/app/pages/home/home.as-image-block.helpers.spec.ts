import { HomeComponent } from './home.component';

describe('HomeComponent asImageBlock (golden WU)', () => {
  it('returns image blocks only', () => {
    const cmp = Object.create(HomeComponent.prototype) as any;
    const image = { type: 'image', src: 'x' };
    expect(cmp.asImageBlock(image)).toBe(image);
    expect(cmp.asImageBlock({ type: 'banner' })).toBeNull();
  });
});
