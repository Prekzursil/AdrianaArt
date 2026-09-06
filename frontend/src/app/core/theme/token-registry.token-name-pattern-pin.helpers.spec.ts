import { TOKEN_NAME_PATTERN } from './token-registry';

/** Golden WU token-name-pattern-pin -- TOKEN_NAME_PATTERN. */
describe('TOKEN_NAME_PATTERN (golden WU)', () => {
  it('accepts --background and rejects missing dashes', () => {
    expect(TOKEN_NAME_PATTERN.test('--background')).toBe(true);
    expect(TOKEN_NAME_PATTERN.test('background')).toBe(false);
  });
});
