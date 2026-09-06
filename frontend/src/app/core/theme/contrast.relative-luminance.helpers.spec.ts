import { relativeLuminance } from './contrast';

/** Golden WU contrast-relative-luminance — relativeLuminance. */
describe('relativeLuminance (golden WU)', () => {
  it('returns 0 for black and 1 for white', () => {
    expect(relativeLuminance([0, 0, 0])).toBeCloseTo(0, 5);
    expect(relativeLuminance([255, 255, 255])).toBeCloseTo(1, 5);
  });
});
