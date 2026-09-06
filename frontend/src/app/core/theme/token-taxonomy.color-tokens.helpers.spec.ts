import { colorTokens } from './token-taxonomy';

/** Golden WU taxonomy-color-tokens — colorTokens. */
describe('colorTokens (golden WU)', () => {
  it('returns only color-kind seed tokens', () => {
    const tokens = colorTokens();
    expect(tokens.length).toBeGreaterThan(0);
    expect(tokens.every((t) => t.kind === 'color')).toBe(true);
  });
});
