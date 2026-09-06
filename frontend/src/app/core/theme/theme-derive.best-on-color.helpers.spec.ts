import { bestOnColor } from './theme-derive';

/** Golden WU best-on-color -- bestOnColor. */
describe('bestOnColor (golden WU)', () => {
  it('picks black or white for maximum contrast against the background', () => {
    expect(bestOnColor([255, 255, 255])).toEqual([0, 0, 0]);
    expect(bestOnColor([0, 0, 0])).toEqual([255, 255, 255]);
    expect(bestOnColor([15, 23, 42])).toEqual([255, 255, 255]);
  });
});
