import { DERIVED_COLOR_NAMES, PRIMARY_DEFAULTS, deriveColorTokens } from './theme-derive';

/** Golden WU derive-color-tokens -- deriveColorTokens. */
describe('deriveColorTokens (golden WU)', () => {
  it('emits all fourteen derived colour tokens from primaries', () => {
    const out = deriveColorTokens(PRIMARY_DEFAULTS);
    for (const name of DERIVED_COLOR_NAMES) {
      expect(out[name]).toMatch(/^\d+ \d+ \d+$/);
    }
    expect(Object.keys(out).sort()).toEqual([...DERIVED_COLOR_NAMES].sort());
  });
});
