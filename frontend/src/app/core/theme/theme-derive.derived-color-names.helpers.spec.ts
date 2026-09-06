import { DERIVED_COLOR_NAMES } from './theme-derive';

/** Golden WU derived-color-names -- DERIVED_COLOR_NAMES. */
describe('DERIVED_COLOR_NAMES (golden WU)', () => {
  it('lists fourteen computed shade/on-color names', () => {
    expect(DERIVED_COLOR_NAMES.length).toBe(14);
    expect(DERIVED_COLOR_NAMES).toContain('--field');
    expect(DERIVED_COLOR_NAMES).toContain('--text-onmedia');
    expect(DERIVED_COLOR_NAMES).not.toContain('--background');
  });
});
