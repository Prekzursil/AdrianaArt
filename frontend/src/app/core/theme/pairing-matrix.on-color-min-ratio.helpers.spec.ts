import { AA_THRESHOLDS } from './contrast';
import { ON_COLOR_MIN_RATIO } from './pairing-matrix';

/** Golden WU on-color-min-ratio -- ON_COLOR_MIN_RATIO. */
describe('ON_COLOR_MIN_RATIO (golden WU)', () => {
  it('is stricter than body AA', () => {
    expect(ON_COLOR_MIN_RATIO).toBe(4.58);
    expect(ON_COLOR_MIN_RATIO).toBeGreaterThan(AA_THRESHOLDS.body);
  });
});
