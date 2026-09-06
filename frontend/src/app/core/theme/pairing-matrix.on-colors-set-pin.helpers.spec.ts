import { ON_COLORS } from './pairing-matrix';

/** Golden WU on-colors-set-pin -- ON_COLORS. */
describe('ON_COLORS (golden WU)', () => {
  it('pins the three inverse/on-media colour names', () => {
    expect(ON_COLORS.has('--text-inverse')).toBe(true);
    expect(ON_COLORS.has('--text-onmedia')).toBe(true);
    expect(ON_COLORS.has('--border-inverse')).toBe(true);
    expect(ON_COLORS.size).toBe(3);
  });
});
