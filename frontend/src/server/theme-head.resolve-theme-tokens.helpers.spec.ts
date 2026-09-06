import { resolveThemeTokens } from './theme-head';

/** Golden WU resolve-theme-tokens -- resolveThemeTokens. */
describe('resolveThemeTokens (golden WU)', () => {
  it('returns derived defaults for null; accepts valid accent override', () => {
    const defaults = resolveThemeTokens(null);
    expect(defaults['--accent']).toBeTruthy();
    expect(defaults['--accent-strong']).toBeTruthy();
    const overridden = resolveThemeTokens({ '--accent': '10 20 30' });
    expect(overridden['--accent']).toBe('10 20 30');
    expect(overridden['--accent-strong']).not.toBe(defaults['--accent-strong']);
  });
});
