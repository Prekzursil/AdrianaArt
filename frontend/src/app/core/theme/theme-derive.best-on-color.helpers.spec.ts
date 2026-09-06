import { bestOnColor } from './theme-derive';

/** Golden WU theme-best-on-color — bestOnColor. */
describe('bestOnColor (golden WU)', () => {
  it('picks black or white for contrast', () => {
    expect(bestOnColor([255, 255, 255])).toEqual([0, 0, 0]);
    expect(bestOnColor([0, 0, 0])).toEqual([255, 255, 255]);
  });
});
