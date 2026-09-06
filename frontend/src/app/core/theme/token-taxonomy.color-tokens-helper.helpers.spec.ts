import { colorTokens, SEED_TOKENS } from './token-taxonomy';

/** Golden WU color-tokens-helper -- colorTokens. */
describe('colorTokens (golden WU)', () => {
  it('returns only kind=color seeds', () => {
    const colors = colorTokens();
    expect(colors.length).toBeGreaterThan(5);
    expect(colors.every((t) => t.kind === 'color')).toBe(true);
    expect(colors.length).toBe(SEED_TOKENS.filter((t) => t.kind === 'color').length);
  });
});
