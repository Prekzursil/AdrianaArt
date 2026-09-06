import { PRIMARY_DEFAULTS, deriveTokens } from './theme-derive';

/** Golden WU derive-tokens-check -- deriveTokens. */
describe('deriveTokens (golden WU)', () => {
  it('passthroughs primaries and recomputes smuggled derived keys', () => {
    const out = deriveTokens({
      ...PRIMARY_DEFAULTS,
      '--text-muted': '0 0 0',
    });
    expect(out['--background']).toBe(PRIMARY_DEFAULTS['--background']);
    expect(out['--text-muted']).not.toBe('0 0 0');
  });
});
