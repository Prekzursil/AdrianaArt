import { isForegroundColorToken } from './pairing-matrix';

/** Golden WU is-foreground-color-token — isForegroundColorToken. */
describe('isForegroundColorToken (golden WU)', () => {
  it('recognises text/accent tokens and rejects surfaces', () => {
    expect(isForegroundColorToken('--text')).toBe(true);
    expect(isForegroundColorToken('--accent')).toBe(true);
    expect(isForegroundColorToken('--background')).toBe(false);
    expect(isForegroundColorToken('--surface')).toBe(false);
  });
});
