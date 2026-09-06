import { bestOnColor } from './theme-derive';

/** Golden WU best-on-color-fn -- bestOnColor. */
describe('bestOnColor (golden WU)', () => {
  it('picks black on white and white on near-black', () => {
    expect(bestOnColor([255, 255, 255])).toEqual([0, 0, 0]);
    expect(bestOnColor([15, 23, 42])).toEqual([255, 255, 255]);
  });
});
