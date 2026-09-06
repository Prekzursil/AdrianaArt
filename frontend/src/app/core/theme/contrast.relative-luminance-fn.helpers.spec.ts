import { relativeLuminance } from './contrast';

/** Golden WU relative-luminance-fn -- relativeLuminance. */
describe('relativeLuminance (golden WU)', () => {
  it('is 0 for black and ~1 for white', () => {
    expect(relativeLuminance([0, 0, 0])).toBe(0);
    expect(relativeLuminance([255, 255, 255])).toBeCloseTo(1, 10);
  });
});
