import { TOKEN_NAME_PATTERN } from './token-registry';

/** Golden WU token-name-pattern -- TOKEN_NAME_PATTERN. */
describe('TOKEN_NAME_PATTERN (golden WU)', () => {
  it('accepts --token names and rejects bare or spaced forms', () => {
    expect(TOKEN_NAME_PATTERN.test('--background')).toBe(true);
    expect(TOKEN_NAME_PATTERN.test('--font-size-base')).toBe(true);
    expect(TOKEN_NAME_PATTERN.test('background')).toBe(false);
    expect(TOKEN_NAME_PATTERN.test('--bad name')).toBe(false);
  });
});
