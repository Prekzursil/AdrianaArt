import { isForegroundColorToken } from './pairing-matrix';

/** Golden WU foreground-token-check -- isForegroundColorToken. */
describe('isForegroundColorToken (golden WU)', () => {
  it('classifies text/accent ink vs tinted surfaces', () => {
    expect(isForegroundColorToken('--text')).toBe(true);
    expect(isForegroundColorToken('--accent')).toBe(true);
    expect(isForegroundColorToken('--accent-subtle')).toBe(false);
    expect(isForegroundColorToken('--background')).toBe(false);
  });
});
