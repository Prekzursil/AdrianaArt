import { DERIVED_COLOR_NAMES, PRIMARY_DEFAULTS, deriveTokens } from './theme-derive';

/** Golden WU derive-tokens -- deriveTokens. */
describe('deriveTokens (golden WU)', () => {
  it('passthroughs primaries and recomputes derived keys', () => {
    const sneaky = { ...PRIMARY_DEFAULTS, '--accent-strong': '1 2 3' };
    const out = deriveTokens(sneaky);
    expect(out['--accent']).toBe(PRIMARY_DEFAULTS['--accent']);
    expect(out['--accent-strong']).not.toBe('1 2 3');
    expect(out['--accent-strong']).toMatch(/^\d+ \d+ \d+$/);
    expect(DERIVED_COLOR_NAMES.every((n) => n in out)).toBe(true);
  });
});
