import { isForegroundColorToken } from './pairing-matrix';

/** Golden WU is-foreground-token-check -- isForegroundColorToken. */
describe('isForegroundColorToken (golden WU)', () => {
  it('treats --text as ink and --background as not', () => {
    expect(isForegroundColorToken('--text')).toBe(true);
    expect(isForegroundColorToken('--background')).toBe(false);
  });
});
