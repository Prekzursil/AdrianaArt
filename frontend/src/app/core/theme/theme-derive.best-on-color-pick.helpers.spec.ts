import { bestOnColor } from './theme-derive';

/** Golden WU best-on-color-pick -- bestOnColor. */
describe('bestOnColor (golden WU)', () => {
  it('picks black on light and white on dark backgrounds', () => {
    expect(bestOnColor([255, 255, 255])).toEqual([0, 0, 0]);
    expect(bestOnColor([15, 23, 42])).toEqual([255, 255, 255]);
  });
});
