import { DERIVED_COLOR_NAMES, PRIMARY_DEFAULTS, deriveColorTokens } from './theme-derive';

/** Golden WU derive-color-tokens-fn -- deriveColorTokens. */
describe('deriveColorTokens (golden WU)', () => {
  it('emits every derived color name from primary defaults', () => {
    const derived = deriveColorTokens(PRIMARY_DEFAULTS);
    for (const name of DERIVED_COLOR_NAMES) {
      expect(derived[name]).toMatch(/^\d+ \d+ \d+$/);
    }
  });
});
