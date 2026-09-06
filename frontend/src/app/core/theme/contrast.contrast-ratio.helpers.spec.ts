import { contrastRatio } from './contrast';

/** Golden WU contrast-ratio — contrastRatio. */
describe('contrastRatio (golden WU)', () => {
  it('is 21 for black/white and 1 for identical colours', () => {
    expect(contrastRatio([0, 0, 0], [255, 255, 255])).toBeCloseTo(21, 5);
    expect(contrastRatio([10, 20, 30], [10, 20, 30])).toBeCloseTo(1, 5);
  });
});
