import { ON_COLORS } from './pairing-matrix';

/** Golden WU on-colors -- ON_COLORS. */
describe('ON_COLORS (golden WU)', () => {
  it('is the closed inverse/onmedia/border-inverse set', () => {
    expect(ON_COLORS.size).toBe(3);
    expect(ON_COLORS.has('--text-inverse')).toBe(true);
    expect(ON_COLORS.has('--text-onmedia')).toBe(true);
    expect(ON_COLORS.has('--border-inverse')).toBe(true);
    expect(ON_COLORS.has('--text')).toBe(false);
  });
});
