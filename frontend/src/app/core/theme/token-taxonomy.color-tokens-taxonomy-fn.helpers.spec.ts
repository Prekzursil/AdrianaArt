import { colorTokens } from './token-taxonomy';

/** Golden WU color-tokens-taxonomy-fn -- colorTokens. */
describe('colorTokens (golden WU)', () => {
  it('returns only color-kind seed tokens including --background', () => {
    const colors = colorTokens();
    expect(colors.every((t) => t.kind === 'color')).toBe(true);
    expect(colors.some((t) => t.name === '--background')).toBe(true);
  });
});
