import { colorTokens } from './token-taxonomy';

/** Golden WU color-tokens -- colorTokens. */
describe('colorTokens (golden WU)', () => {
  it('returns only color-kind seed tokens', () => {
    const colors = colorTokens();
    expect(colors.length).toBeGreaterThan(0);
    expect(colors.every((t) => t.kind === 'color')).toBe(true);
    expect(colors.some((t) => t.name === '--accent')).toBe(true);
  });
});
