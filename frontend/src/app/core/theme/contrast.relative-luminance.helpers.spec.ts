import { relativeLuminance } from './contrast';

/** Golden WU relative-luminance -- relativeLuminance. */
describe('relativeLuminance (golden WU)', () => {
  it('maps black->0 and white->1; green channel dominates mid greys', () => {
    expect(relativeLuminance([0, 0, 0])).toBe(0);
    expect(relativeLuminance([255, 255, 255])).toBeCloseTo(1, 5);
    expect(relativeLuminance([0, 255, 0])).toBeGreaterThan(relativeLuminance([255, 0, 0]));
  });
});
