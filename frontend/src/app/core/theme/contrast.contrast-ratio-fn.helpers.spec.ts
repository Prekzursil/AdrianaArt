import { contrastRatio } from './contrast';

/** Golden WU contrast-ratio-fn -- contrastRatio. */
describe('contrastRatio (golden WU)', () => {
  it('is ~21:1 for black on white and ~1:1 for identical greys', () => {
    expect(contrastRatio([0, 0, 0], [255, 255, 255])).toBeCloseTo(21, 5);
    expect(contrastRatio([128, 128, 128], [128, 128, 128])).toBeCloseTo(1, 5);
  });
});
