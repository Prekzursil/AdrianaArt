import { evaluateThemeContrast } from './pairing-matrix';

/** Golden WU evaluate-theme-contrast -- evaluateThemeContrast. */
describe('evaluateThemeContrast (golden WU)', () => {
  it('defaults publish clean; near-white accent on white fails', () => {
    expect(evaluateThemeContrast({})).toEqual([]);
    const failures = evaluateThemeContrast({
      '--accent': '250 250 250',
      '--background': '255 255 255',
    });
    expect(failures.length).toBeGreaterThan(0);
    expect(failures.every((f) => f.ratio < f.target)).toBe(true);
  });
});
