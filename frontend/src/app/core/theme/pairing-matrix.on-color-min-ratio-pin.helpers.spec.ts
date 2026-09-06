import { ON_COLOR_MIN_RATIO } from './pairing-matrix';

/** Golden WU on-color-min-ratio-pin -- ON_COLOR_MIN_RATIO. */
describe('ON_COLOR_MIN_RATIO (golden WU)', () => {
  it('pins the black/white crossover floor at 4.58', () => {
    expect(ON_COLOR_MIN_RATIO).toBe(4.58);
  });
});
